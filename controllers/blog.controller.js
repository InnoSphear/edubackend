import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, category, featured, popular } = req.query;
    
    const query = { status: 'published' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (popular === 'true') query.popular = true;
    
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      blogs,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(6);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { status: 'published' });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
