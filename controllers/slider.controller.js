import Slider from '../models/Slider.js';

export const getSliders = async (req, res) => {
  try {
    const now = new Date();
    const sliders = await Slider.find({
      isActive: true,
      $or: [
        { startDate: null, endDate: null },
        { startDate: { $lte: now }, endDate: null },
        { startDate: null, endDate: { $gte: now } },
        { startDate: { $lte: now }, endDate: { $gte: now } }
      ]
    }).sort({ order: 1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
