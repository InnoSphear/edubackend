import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String },
  image: { type: String },
  category: { type: String, enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'], default: 'Undergraduate' },
  parentStream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Stream', streamSchema);
