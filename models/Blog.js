import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  author: {
    name: { type: String },
    avatar: { type: String }
  },
  category: { 
    type: String, 
    enum: ['Career', 'College Guide', 'Exams', 'Admissions', 'Scholarships', 'Placements', 'Tips'], 
    index: true 
  },
  tags: [{ type: String }],
  image: { type: String },
  readTime: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published' },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }]
  },
  publishedAt: { type: Date },
  relatedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
}, { timestamps: true });

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export default mongoose.model('Blog', blogSchema);
