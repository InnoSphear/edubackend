import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, index: true },
  email: { type: String },
  course: { type: String, index: true },
  city: { type: String, index: true },
  state: { type: String },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  source: { type: String, enum: ['popup', 'contact_form', 'inquiry', 'other'], default: 'popup' },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'lost'], default: 'new' },
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  followUpDate: { type: Date },
  lastContactedAt: { type: Date }
}, { timestamps: true });

leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Lead', leadSchema);
