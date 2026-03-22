import express from 'express';
import { auth, admin } from '../middlewares/auth.middleware.js';
import {
  getDashboardStats,
  createCollege, updateCollege, deleteCollege,
  createStream, updateStream, deleteStream,
  createCourse, updateCourse, deleteCourse,
  createExam, updateExam, deleteExam,
  createBlog, updateBlog, deleteBlog,
  createNews, updateNews, deleteNews,
  getAllLeads, updateLeadStatus, deleteLead,
  createUser, getUsers, updateUser, deleteUser,
  createSlider, updateSlider, deleteSlider, getAllSliders
} from '../controllers/admin.controller.js';

const router = express.Router();

router.use(auth);
router.use(admin);

router.get('/dashboard', getDashboardStats);

router.get('/colleges', async (req, res) => {
  const College = (await import('../models/College.js')).default;
  const colleges = await College.find().populate('streams', 'name').populate('courses', 'name').sort({ createdAt: -1 });
  res.json(colleges);
});

router.post('/colleges', createCollege);
router.put('/colleges/:id', updateCollege);
router.delete('/colleges/:id', deleteCollege);

router.get('/streams', async (req, res) => {
  const Stream = (await import('../models/Stream.js')).default;
  const streams = await Stream.find().sort({ order: 1 });
  res.json(streams);
});
router.post('/streams', createStream);
router.put('/streams/:id', updateStream);
router.delete('/streams/:id', deleteStream);

router.get('/courses', async (req, res) => {
  const Course = (await import('../models/Course.js')).default;
  const courses = await Course.find().populate('stream', 'name').sort({ createdAt: -1 });
  res.json(courses);
});
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

router.get('/exams', async (req, res) => {
  const Exam = (await import('../models/Exam.js')).default;
  const exams = await Exam.find().sort({ createdAt: -1 });
  res.json(exams);
});
router.post('/exams', createExam);
router.put('/exams/:id', updateExam);
router.delete('/exams/:id', deleteExam);

router.get('/blogs', async (req, res) => {
  const Blog = (await import('../models/Blog.js')).default;
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

router.get('/news', async (req, res) => {
  const News = (await import('../models/News.js')).default;
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});
router.post('/news', createNews);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

router.get('/leads', getAllLeads);
router.put('/leads/:id', updateLeadStatus);
router.delete('/leads/:id', deleteLead);

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/sliders', getAllSliders);
router.post('/sliders', createSlider);
router.put('/sliders/:id', updateSlider);
router.delete('/sliders/:id', deleteSlider);

export default router;
