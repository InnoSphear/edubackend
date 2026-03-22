import mongoose from 'mongoose';

const specializationSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  duration: { type: String },
  fees: {
    min: { type: Number },
    max: { type: Number }
  },
  eligibility: { type: String },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Specialization', specializationSchema);
