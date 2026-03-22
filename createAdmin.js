import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://innosphear_db_user:ujjwal123@cluster0.yfyiczq.mongodb.net/';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@gmail.com';
    let adminOpts = await User.findOne({ email: adminEmail });
    if (!adminOpts) {
      const adminParams = new User({
        name: 'Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin'
      });
      await adminParams.save();
      console.log('Admin user created: admin@educationgateway.com / admin123');
    } else {
      console.log('Admin already exists');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
