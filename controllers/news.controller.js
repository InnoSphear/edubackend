import News from '../models/News.js';

export const getNews = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, category, featured, breaking } = req.query;
    
    const query = { status: 'published' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (breaking === 'true') query.breaking = true;
    
    const news = await News.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await News.countDocuments(query);
    
    res.json({
      news,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const newsItem = await News.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ featured: true, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(6);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBreakingNews = async (req, res) => {
  try {
    const news = await News.find({ breaking: true, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(5);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
