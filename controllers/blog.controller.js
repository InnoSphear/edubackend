import Blog from '../models/Blog.js';
import { fallbackBlogs, isDbReady, paginate } from '../utils/fallbackContent.js';

const filterFallbackBlogs = ({ search, category }) => fallbackBlogs.filter((blog) => {
  const matchesSearch = !search || blog.title.toLowerCase().includes(search.toLowerCase()) || blog.excerpt?.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = !category || blog.category === category;
  return matchesSearch && matchesCategory;
});

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, category, featured, popular } = req.query;
    const query = { status: 'published' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (popular === 'true') query.popular = true;

    if (isDbReady()) {
      const blogs = await Blog.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (blogs.length) {
        const total = await Blog.countDocuments(query);
        return res.json({
          blogs,
          pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
        });
      }
    }

    const fallbackPage = paginate(filterFallbackBlogs({ search, category }), page, limit);
    return res.json({ blogs: fallbackPage.items, pagination: fallbackPage.pagination });
  } catch (error) {
    const fallbackPage = paginate(filterFallbackBlogs(req.query), req.query.page || 1, req.query.limit || 12);
    res.json({ blogs: fallbackPage.items, pagination: fallbackPage.pagination });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    if (isDbReady()) {
      const blog = await Blog.findOneAndUpdate(
        { slug: req.params.slug, status: 'published' },
        { $inc: { views: 1 } },
        { new: true },
      );
      if (blog) return res.json(blog);
    }

    const fallbackBlog = fallbackBlogs.find((item) => item.slug === req.params.slug);
    if (!fallbackBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json(fallbackBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedBlogs = async (req, res) => {
  try {
    if (isDbReady()) {
      const blogs = await Blog.find({ featured: true, status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(6);
      if (blogs.length) return res.json(blogs);
    }

    res.json(fallbackBlogs.slice(0, 6));
  } catch (error) {
    res.json(fallbackBlogs.slice(0, 6));
  }
};

export const getCategories = async (req, res) => {
  try {
    if (isDbReady()) {
      const categories = await Blog.distinct('category', { status: 'published' });
      if (categories.length) return res.json(categories);
    }

    res.json([...new Set(fallbackBlogs.map((item) => item.category).filter(Boolean))]);
  } catch (error) {
    res.json([...new Set(fallbackBlogs.map((item) => item.category).filter(Boolean))]);
  }
};
