import Course from '../models/Course.js';
import Specialization from '../models/Specialization.js';

export const getCourses = async (req, res) => {
  try {
    const { stream } = req.query;
    const query = { status: 'active' };
    if (stream) query.stream = stream;
    
    const courses = await Course.find(query)
      .populate('stream', 'name slug')
      .sort({ order: 1, name: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, status: 'active' })
      .populate('stream', 'name slug');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    const specializations = await Specialization.find({ course: course._id, status: 'active' });
    res.json({ ...course.toObject(), specializations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpecializationBySlug = async (req, res) => {
  try {
    const spec = await Specialization.findOne({ slug: req.params.slug, status: 'active' })
      .populate('course', 'name slug')
      .populate('stream', 'name slug');
    if (!spec) return res.status(404).json({ error: 'Specialization not found' });
    res.json(spec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
