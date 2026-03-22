import College from '../models/College.js';

export const getColleges = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, state, city, stream, course, feesMin, feesMax, rating, ownership, exam, sort, featured, popular } = req.query;
    
    const query = { status: 'active' };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.state': { $regex: search, $options: 'i' } }
      ];
    }
    if (state) query['location.state'] = state;
    if (city) query['location.city'] = { $regex: city, $options: 'i' };
    if (stream) query.streams = stream;
    if (course) query.courses = course;
    if (exam) query.examsAccepted = exam;
    if (ownership) query.ownership = ownership;
    if (featured === 'true') query.featured = true;
    if (popular === 'true') query.popular = true;
    
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (feesMin || feesMax) {
      query['fees.max'] = {};
      if (feesMin) query['fees.max'].$gte = parseInt(feesMin);
      if (feesMax) query['fees.max'].$lte = parseInt(feesMax);
    }
    
    let sortOption = { ranking: 1, rating: -1 };
    if (sort === 'fees_asc') sortOption = { 'fees.min': 1 };
    if (sort === 'fees_desc') sortOption = { 'fees.min': -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    
    const colleges = await College.find(query)
      .populate('streams', 'name slug icon')
      .populate({
        path: 'courses',
        select: 'name slug duration fees stream',
        populate: { path: 'stream', select: 'name slug' }
      })
      .populate('examsAccepted', 'name slug')
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await College.countDocuments(query);
    
    res.json({
      colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCollegeBySlug = async (req, res) => {
  try {
    const college = await College.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate('streams', 'name slug icon')
     .populate({
      path: 'courses',
      select: 'name slug duration fees eligibility',
      populate: { path: 'stream', select: 'name slug' }
     })
     .populate('examsAccepted', 'name slug');
    
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id)
      .populate('streams', 'name slug icon')
      .populate({
        path: 'courses',
        select: 'name slug duration fees eligibility stream',
        populate: { path: 'stream', select: 'name slug' }
      })
      .populate('examsAccepted', 'name slug');
    
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedColleges = async (req, res) => {
  try {
    const colleges = await College.find({ featured: true, status: 'active' })
      .populate('streams', 'name slug')
      .limit(6);
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStates = async (req, res) => {
  try {
    const states = await College.distinct('location.state', { status: 'active' });
    res.json(states.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCities = async (req, res) => {
  try {
    const { state } = req.query;
    const query = { status: 'active' };
    if (state) query['location.state'] = state;
    const cities = await College.distinct('location.city', query);
    res.json(cities.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
