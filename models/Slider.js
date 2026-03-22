import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  link: { type: String },
  linkText: { type: String },
  buttonText: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Slider', sliderSchema);
