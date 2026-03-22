import Exam from '../models/Exam.js';

export const getExams = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, stream, status, featured, popular } = req.query;
    
    const query = { status: 'active' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } }
      ];
    }
    if (stream) query.streams = stream;
    if (status) query.status = status;
    if (featured === 'true') query.featured = true;
    if (popular === 'true') query.popular = true;
    
    const exams = await Exam.find(query)
      .populate('streams', 'name slug')
      .sort({ examDate: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Exam.countDocuments(query);
    
    res.json({
      exams,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExamBySlug = async (req, res) => {
  try {
    const exam = await Exam.findOne({ slug: req.params.slug })
      .populate('streams', 'name slug')
      .populate('acceptColleges', 'name slug');
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedExams = async (req, res) => {
  try {
    const exams = await Exam.find({ featured: true, status: 'active' })
      .populate('streams', 'name slug')
      .limit(6);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
