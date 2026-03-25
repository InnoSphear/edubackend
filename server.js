import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import collegeRoutes from './routes/college.routes.js';
import streamRoutes from './routes/stream.routes.js';
import courseRoutes from './routes/course.routes.js';
import examRoutes from './routes/exam.routes.js';
import blogRoutes from './routes/blog.routes.js';
import newsRoutes from './routes/news.routes.js';
import leadRoutes from './routes/lead.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import sliderRoutes from './routes/slider.routes.js';
import connectDB from './config/db.js';
import User from './models/User.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));



app.use('/api/colleges', collegeRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sliders', sliderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'Admin';

  const existingAdmin = await User.findOne({ email: adminEmail }).select('_id');
  if (existingAdmin) {
    console.log(`Admin user available: ${adminEmail}`);
    return;
  }

  const adminUser = new User({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  });

  await adminUser.save();
  console.log(`Admin user created from env: ${adminEmail}`);
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  const dbConnected = await connectDB();

  if (dbConnected) {
    try {
      await ensureAdminUser();
    } catch (error) {
      console.error('Admin bootstrap failed:', error.message);
    }
  }

  console.log(`Server running on port ${PORT}`);
});

export default app;
