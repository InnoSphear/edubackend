import express from 'express';
import { getStreams, getStreamBySlug, getAllStreams } from '../controllers/stream.controller.js';

const router = express.Router();

router.get('/', getStreams);
router.get('/all', getAllStreams);
router.get('/:slug', getStreamBySlug);

export default router;
