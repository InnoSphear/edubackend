import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Admission', 'Results', 'Government Updates', 'Exams', 'Scholarships', 'Events'], 
    index: true 
  },
  tags: [{ type: String }],
  image: { type: String },
  source: { type: String },
  author: { type: String },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  breaking: { type: Boolean, default: false },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published' },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }]
  },
  publishedAt: { type: Date },
  relatedNews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }]
}, { timestamps: true });

newsSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export default mongoose.model('News', newsSchema);
