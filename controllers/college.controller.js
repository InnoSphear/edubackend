import mongoose from 'mongoose';
import College from '../models/College.js';
import { fallbackColleges, isDbReady, paginate } from '../utils/fallbackContent.js';

const expandTerms = (value) => {
  const term = value?.toLowerCase().trim();
  if (!term) return [];
  const aliases = {
    management: ['management', 'mba', 'pgdm', 'business'],
    mba: ['mba', 'management', 'pgdm', 'business'],
    engineering: ['engineering', 'b.tech', 'be', 'technology'],
    medical: ['medical', 'mbbs', 'health', 'doctor'],
    'private medical': ['private medical', 'medical', 'mbbs'],
  };
  return aliases[term] || [term];
};

const filterFallbackColleges = ({ search, stream, category }) => {
  const terms = [search, stream, category].flatMap(expandTerms);
  if (!terms.length) return fallbackColleges;

  return fallbackColleges.filter((college) => terms.some((term) => (
    college.name.toLowerCase().includes(term)
    || college.category.toLowerCase().includes(term)
    || (college.tags || []).some((tag) => tag.toLowerCase().includes(term))
    || (college.course || []).some((course) => course.courseName.toLowerCase().includes(term))
  )));
};

export const getColleges = async (req, res) => {
  try {
    const { page = 1, limit = 9, search, stream, category } = req.query;
    const query = {};

    if (search) {
      const searchTerms = expandTerms(search);
      query.$or = [
        ...searchTerms.map((term) => ({ name: { $regex: term, $options: 'i' } })),
        ...searchTerms.map((term) => ({ category: { $regex: term, $options: 'i' } })),
        ...searchTerms.map((term) => ({ tags: { $regex: term, $options: 'i' } })),
        ...searchTerms.map((term) => ({ 'course.courseName': { $regex: term, $options: 'i' } })),
      ];
    }

    if (stream) {
      query.$or = [
        ...(query.$or || []),
        ...expandTerms(stream).map((term) => ({ category: { $regex: term, $options: 'i' } })),
        ...expandTerms(stream).map((term) => ({ tags: { $regex: term, $options: 'i' } })),
      ];
    }

    if (category) {
      query.$or = [
        ...(query.$or || []),
        ...expandTerms(category).map((term) => ({ category: { $regex: term, $options: 'i' } })),
      ];
    }

    if (isDbReady()) {
      const colleges = await College.find(query)
        .sort({ 'ranking.rank': 1, rating: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (colleges.length) {
        const total = await College.countDocuments(query);
        return res.json({
          colleges,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit),
          },
        });
      }
    }

    const fallbackPage = paginate(filterFallbackColleges({ search, stream, category }), page, limit);
    return res.json({ colleges: fallbackPage.items, pagination: fallbackPage.pagination });
  } catch (error) {
    const fallbackPage = paginate(filterFallbackColleges(req.query), req.query.page || 1, req.query.limit || 9);
    res.json({ colleges: fallbackPage.items, pagination: fallbackPage.pagination });
  }
};

export const getCollegeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (isDbReady()) {
      const college = await College.findOne({
        $or: [
          { slug },
          ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : []),
        ],
      });

      if (college) return res.json(college);
    }

    const fallbackCollege = fallbackColleges.find((item) => item.slug === slug || item._id === slug);
    if (!fallbackCollege) return res.status(404).json({ error: 'College not found' });
    res.json(fallbackCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    if (isDbReady()) {
      const college = await College.findById(req.params.id);
      if (college) return res.json(college);
    }

    const fallbackCollege = fallbackColleges.find((item) => item._id === req.params.id || item.slug === req.params.id);
    if (!fallbackCollege) return res.status(404).json({ error: 'College not found' });
    res.json(fallbackCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedColleges = async (req, res) => {
  try {
    if (isDbReady()) {
      const colleges = await College.find()
        .sort({ 'ranking.rank': 1, rating: -1, createdAt: -1 })
        .limit(8);

      if (colleges.length) return res.json(colleges);
    }

    res.json(fallbackColleges.slice(0, 8));
  } catch (error) {
    res.json(fallbackColleges.slice(0, 8));
  }
};

export const getStates = async (req, res) => {
  const states = [...new Set(fallbackColleges.map((item) => item.location?.state).filter(Boolean))];
  res.json(states);
};

export const getCities = async (req, res) => {
  const cities = [...new Set(fallbackColleges.map((item) => item.location?.city).filter(Boolean))];
  res.json(cities);
};
