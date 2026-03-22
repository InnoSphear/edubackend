import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  location: {
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    address: { type: String }
  },
  ownership: { type: String, enum: ['Government', 'Private', 'Deemed'], default: 'Private' },
  fees: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  ranking: { type: Number },
  streams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  examsAccepted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
  examScoresAccepted: [{
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    minScore: { type: String }
  }],
  placements: {
    avg: { type: Number },
    highest: { type: Number },
    median: { type: Number },
    topRecruiters: [{ type: String }],
    percentagePlaced: { type: Number }
  },
  scholarships: [{
    name: { type: String },
    eligibility: { type: String },
    amount: { type: Number }
  }],
  facilities: [{ type: String }],
  images: [{
    url: { type: String },
    alt: { type: String }
  }],
  thumbnail: { type: String },
  established: { type: Number },
  intake: { type: Number },
  nirfRank: { type: Number },
  approvedBy: [{ type: String }],
  affiliation: { type: String },
  eligibility: { type: String },
  cutoff: { type: String },
  seats: { type: Number },
  salary: {
    min: { type: Number },
    max: { type: Number }
  },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  viewCount: { type: Number, default: 0 }
}, { timestamps: true });

collegeSchema.index({ name: 'text', 'location.city': 'text', 'location.state': 'text' });

export default mongoose.model('College', collegeSchema);
