import express from 'express';
import { getCourses, getCourseBySlug, getSpecializationBySlug } from '../controllers/course.controller.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);
router.get('/specialization/:slug', getSpecializationBySlug);

export default router;
