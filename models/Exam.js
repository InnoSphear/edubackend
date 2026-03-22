import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  fullName: { type: String },
  description: { type: String },
  conductingBody: { type: String },
  examLevel: { type: String, enum: ['National', 'State', 'University', 'International'], default: 'National' },
  streams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }],
  dates: {
    registrationStart: { type: Date },
    registrationEnd: { type: Date },
    examDate: { type: Date },
    resultDate: { type: Date }
  },
  eligibility: {
    education: { type: String },
    age: { type: String },
    attempts: { type: Number }
  },
  syllabus: {
    sections: [{
      name: { type: String },
      topics: [{ type: String }]
    }]
  },
  pattern: {
    mode: { type: String, enum: ['Online', 'Offline', 'Computer Based', 'Pen Paper'], default: 'Online' },
    duration: { type: String },
    sections: { type: Number },
    totalQuestions: { type: Number },
    totalMarks: { type: Number },
    markingScheme: { type: String },
    negativeMarking: { type: String }
  },
  cutoff: {
    general: { type: Number },
    obc: { type: Number },
    sc: { type: Number },
    st: { type: Number }
  },
  fees: {
    registration: { type: Number },
    exam: { type: Number }
  },
  examCenters: [{ type: String }],
  acceptColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
  image: { type: String },
  importantDates: [{
    event: { type: String },
    date: { type: Date }
  }],
  preparationTips: [{ type: String }],
  previousYearPapers: [{ type: String }],
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive', 'upcoming', 'completed'], default: 'active' }
}, { timestamps: true });

examSchema.index({ name: 'text', fullName: 'text' });

export default mongoose.model('Exam', examSchema);
