import College from '../models/College.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';
import Specialization from '../models/Specialization.js';
import Exam from '../models/Exam.js';
import Blog from '../models/Blog.js';
import News from '../models/News.js';
import Lead from '../models/Lead.js';
import User from '../models/User.js';
import Slider from '../models/Slider.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [colleges, streams, courses, exams, blogs, news, leads, users] = await Promise.all([
      College.countDocuments(),
      Stream.countDocuments(),
      Course.countDocuments(),
      Exam.countDocuments(),
      Blog.countDocuments(),
      News.countDocuments(),
      Lead.countDocuments(),
      User.countDocuments()
    ]);
    
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(10);
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const today = new Date();
    const weekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const leadsThisWeek = await Lead.countDocuments({ createdAt: { $gte: weekAgo } });
    
    res.json({
      stats: { colleges, streams, courses, exams, blogs, news, leads, users },
      recentLeads,
      leadsByStatus,
      leadsThisWeek
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStream = async (req, res) => {
  try {
    const stream = new Stream(req.body);
    await stream.save();
    res.status(201).json(stream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!stream) return res.status(404).json({ error: 'Stream not found' });
    res.json(stream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndDelete(req.params.id);
    if (!stream) return res.status(404).json({ error: 'Stream not found' });
    res.json({ message: 'Stream deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ error: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: 'News not found' });
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, course, city, search, startDate, endDate } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (course) query.course = course;
    if (city) query.city = { $regex: city, $options: 'i' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const leads = await Lead.find(query)
      .populate('college', 'name')
      .populate('exam', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Lead.countDocuments(query);
    
    res.json({
      leads,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSlider = async (req, res) => {
  try {
    const slider = new Slider(req.body);
    await slider.save();
    res.status(201).json(slider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slider) return res.status(404).json({ error: 'Slider not found' });
    res.json(slider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) return res.status(404).json({ error: 'Slider not found' });
    res.json({ message: 'Slider deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
