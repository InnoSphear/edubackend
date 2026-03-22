import express from 'express';
import { getColleges, getCollegeBySlug, getCollegeById, getFeaturedColleges, getStates, getCities } from '../controllers/college.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/featured', getFeaturedColleges);
router.get('/states', getStates);
router.get('/cities', getCities);
router.get('/id/:id', getCollegeById);
router.get('/:slug', getCollegeBySlug);

export default router;
