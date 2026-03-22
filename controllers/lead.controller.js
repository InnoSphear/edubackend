import Lead from '../models/Lead.js';

export const createLead = async (req, res) => {
  try {
    const lead = new Lead({
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });
    await lead.save();
    res.status(201).json({ message: 'Thank you! Our counselor will contact you shortly.', lead });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You have already submitted a query. We will contact you soon!' });
    }
    res.status(400).json({ error: error.message });
  }
};
