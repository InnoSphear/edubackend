import express from 'express';
import { getExams, getExamBySlug, getFeaturedExams } from '../controllers/exam.controller.js';

const router = express.Router();

router.get('/', getExams);
router.get('/featured', getFeaturedExams);
router.get('/:slug', getExamBySlug);

export default router;
