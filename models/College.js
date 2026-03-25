import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, trim: true, unique: true, sparse: true, index: true },
  website: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  logo: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }],
  image: [{ type: String }],
  location: {
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
  },
  description: { type: String, required: true },
  highlights: [{ type: String, trim: true }],
  rating: { type: Number, default: 4.5 },
  established: { type: Number },
  ownership: { type: String, enum: ['Government', 'Private', 'Deemed', 'Autonomous'], default: 'Government' },
  ranking: {
    authority: { type: String, trim: true, default: 'NIRF' },
    rank: { type: Number },
    year: { type: Number },
  },
  brochureUrl: { type: String, trim: true, default: '' },
  course: [{
    courseName: { type: String, required: true, trim: true },
    fee: { type: String, required: true, trim: true },
    placement: { type: String, required: true, trim: true },
    duration: { type: String, trim: true, default: '' },
    eligibility: { type: String, trim: true, default: '' },
  }],
  facilities: [{ type: String }],
  averagePlacement: { type: String, required: true, trim: true },
  highestPackage: { type: String, trim: true, default: '' },
}, { timestamps: true });

collegeSchema.pre('validate', function setCollegeSlug(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }
  next();
});

const College = mongoose.model('College', collegeSchema);

export default College;
