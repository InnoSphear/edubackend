import College from '../models/College.js';

export const getColleges = async (req, res) => {
  try {
    const { page = 1, limit = 12, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    const colleges = await College.find(query)
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
    const college = await College.findById(req.params.slug);
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedColleges = async (req, res) => {
  try {
    const colleges = await College.find().limit(6);
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStates = async (req, res) => {
  res.json([]);
};

export const getCities = async (req, res) => {
  res.json([]);
};

