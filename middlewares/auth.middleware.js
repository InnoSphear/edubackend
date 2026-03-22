import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid token or user inactive.' });
    
    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const admin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied. Admin only.' });
  next();
};
