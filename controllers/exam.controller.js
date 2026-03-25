import Exam from '../models/Exam.js';
import { fallbackExams, isDbReady, paginate } from '../utils/fallbackContent.js';

const filterFallbackExams = ({ search, status }) => fallbackExams.filter((exam) => {
  const matchesSearch = !search || exam.name.toLowerCase().includes(search.toLowerCase()) || exam.fullName?.toLowerCase().includes(search.toLowerCase());
  const matchesStatus = !status || exam.status === status;
  return matchesSearch && matchesStatus;
});

export const getExams = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, stream, status, featured, popular } = req.query;
    const query = { status: 'active' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
      ];
    }
    if (stream) query.streams = stream;
    if (status) query.status = status;
    if (featured === 'true') query.featured = true;
    if (popular === 'true') query.popular = true;

    if (isDbReady()) {
      const exams = await Exam.find(query)
        .populate('streams', 'name slug')
        .sort({ examDate: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (exams.length) {
        const total = await Exam.countDocuments(query);
        return res.json({
          exams,
          pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
        });
      }
    }

    const fallbackPage = paginate(filterFallbackExams({ search, status }), page, limit);
    return res.json({ exams: fallbackPage.items, pagination: fallbackPage.pagination });
  } catch (error) {
    const fallbackPage = paginate(filterFallbackExams(req.query), req.query.page || 1, req.query.limit || 12);
    res.json({ exams: fallbackPage.items, pagination: fallbackPage.pagination });
  }
};

export const getExamBySlug = async (req, res) => {
  try {
    if (isDbReady()) {
      const exam = await Exam.findOne({ slug: req.params.slug })
        .populate('streams', 'name slug')
        .populate('acceptColleges', 'name slug');
      if (exam) return res.json(exam);
    }

    const fallbackExam = fallbackExams.find((item) => item.slug === req.params.slug);
    if (!fallbackExam) return res.status(404).json({ error: 'Exam not found' });
    res.json(fallbackExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedExams = async (req, res) => {
  try {
    if (isDbReady()) {
      const exams = await Exam.find({ featured: true, status: 'active' })
        .populate('streams', 'name slug')
        .limit(6);
      if (exams.length) return res.json(exams);
    }

    res.json(fallbackExams.slice(0, 6));
  } catch (error) {
    res.json(fallbackExams.slice(0, 6));
  }
};
