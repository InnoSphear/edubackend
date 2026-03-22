import express from 'express';
import { getNews, getNewsBySlug, getFeaturedNews, getBreakingNews } from '../controllers/news.controller.js';

const router = express.Router();

router.get('/', getNews);
router.get('/featured', getFeaturedNews);
router.get('/breaking', getBreakingNews);
router.get('/:slug', getNewsBySlug);

export default router;
