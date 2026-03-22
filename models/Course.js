import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream', required: true, index: true },
  duration: { type: String },
  mode: { type: String, enum: ['Full-time', 'Part-time', 'Distance', 'Online'], default: 'Full-time' },
  degreeType: { type: String, enum: ['Bachelor', 'Master', 'Diploma', 'Certificate'], default: 'Bachelor' },
  fees: {
    min: { type: Number },
    max: { type: Number }
  },
  eligibility: { type: String },
  careerOpportunities: [{ type: String }],
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
