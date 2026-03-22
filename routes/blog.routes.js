import express from 'express';
import { getBlogs, getBlogBySlug, getFeaturedBlogs, getCategories } from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/categories', getCategories);
router.get('/:slug', getBlogBySlug);

export default router;
