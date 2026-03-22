import Stream from '../models/Stream.js';

export const getStreams = async (req, res) => {
  try {
    const streams = await Stream.find({ status: 'active', parentStream: null })
      .sort({ order: 1, name: 1 });
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStreamBySlug = async (req, res) => {
  try {
    const stream = await Stream.findOne({ slug: req.params.slug, status: 'active' });
    if (!stream) return res.status(404).json({ error: 'Stream not found' });
    
    const subStreams = await Stream.find({ parentStream: stream._id, status: 'active' });
    res.json({ ...stream.toObject(), subStreams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find().sort({ order: 1, name: 1 });
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
