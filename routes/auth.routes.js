import express from 'express';
import { register, login, getProfile, changePassword } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.post('/change-password', auth, changePassword);

export default router;
