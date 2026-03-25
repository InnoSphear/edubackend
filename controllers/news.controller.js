import News from '../models/News.js';
import { fallbackNews, isDbReady, paginate } from '../utils/fallbackContent.js';

const filterFallbackNews = ({ search, category, breaking }) => fallbackNews.filter((item) => {
  const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.excerpt?.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = !category || item.category === category;
  const matchesBreaking = breaking !== 'true' || item.breaking;
  return matchesSearch && matchesCategory && matchesBreaking;
});

export const getNews = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, category, featured, breaking } = req.query;
    const query = { status: 'published' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (breaking === 'true') query.breaking = true;

    if (isDbReady()) {
      const news = await News.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (news.length) {
        const total = await News.countDocuments(query);
        return res.json({
          news,
          pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
        });
      }
    }

    const fallbackPage = paginate(filterFallbackNews({ search, category, breaking }), page, limit);
    return res.json({ news: fallbackPage.items, pagination: fallbackPage.pagination });
  } catch (error) {
    const fallbackPage = paginate(filterFallbackNews(req.query), req.query.page || 1, req.query.limit || 12);
    res.json({ news: fallbackPage.items, pagination: fallbackPage.pagination });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    if (isDbReady()) {
      const newsItem = await News.findOneAndUpdate(
        { slug: req.params.slug, status: 'published' },
        { $inc: { views: 1 } },
        { new: true },
      );
      if (newsItem) return res.json(newsItem);
    }

    const fallbackItem = fallbackNews.find((item) => item.slug === req.params.slug);
    if (!fallbackItem) return res.status(404).json({ error: 'News not found' });
    res.json(fallbackItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedNews = async (req, res) => {
  try {
    if (isDbReady()) {
      const news = await News.find({ featured: true, status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(6);
      if (news.length) return res.json(news);
    }

    res.json(fallbackNews.slice(0, 6));
  } catch (error) {
    res.json(fallbackNews.slice(0, 6));
  }
};

export const getBreakingNews = async (req, res) => {
  try {
    if (isDbReady()) {
      const news = await News.find({ breaking: true, status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(5);
      if (news.length) return res.json(news);
    }

    res.json(fallbackNews.filter((item) => item.breaking).slice(0, 5));
  } catch (error) {
    res.json(fallbackNews.filter((item) => item.breaking).slice(0, 5));
  }
};
