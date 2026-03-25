import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const streamSchema = new mongoose.Schema({
  name: String, slug: String, description: String, icon: String,
  category: { type: String, enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'], default: 'Undergraduate' },
  order: Number, status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  name: String, slug: String, description: String,
  stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' },
  duration: String, mode: { type: String, default: 'Full-time' },
  degreeType: { type: String, default: 'Bachelor' },
  fees: { min: Number, max: Number },
  eligibility: String, order: Number,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const collegeSchema = new mongoose.Schema({
  name: String, slug: String, description: String,
  location: { city: String, state: String, address: String },
  ownership: { type: String, enum: ['Government', 'Private', 'Deemed'], default: 'Private' },
  fees: { min: Number, max: Number },
  rating: { type: Number, default: 4 },
  streams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  placements: { avg: Number, highest: Number, percentagePlaced: Number, topRecruiters: [String] },
  facilities: [String], thumbnail: String, established: Number, nirfRank: Number,
  featured: { type: Boolean, default: false }, popular: { type: Boolean, default: false },
  status: { type: String, default: 'active' }
}, { timestamps: true });

const Stream = mongoose.model('Stream', streamSchema);
const Course = mongoose.model('Course', courseSchema);
const College = mongoose.model('College', collegeSchema);

const streams = [
  { name: 'Engineering', slug: 'engineering', description: 'B.Tech, M.Tech and other engineering programs', icon: '🔧', order: 1 },
  { name: 'Management', slug: 'management', description: 'MBA, BBA and management programs', icon: '💼', order: 2 },
  { name: 'Medical', slug: 'medical', description: 'MBBS, BDS, MD and medical programs', icon: '🏥', order: 3 },
  { name: 'Science', slug: 'science', description: 'B.Sc, M.Sc and science programs', icon: '🔬', order: 4 },
  { name: 'Commerce', slug: 'commerce', description: 'B.Com, M.Com and commerce programs', icon: '📊', order: 5 },
  { name: 'Arts & Humanities', slug: 'arts-humanities', description: 'BA, MA and humanities programs', icon: '🎨', order: 6 },
  { name: 'Law', slug: 'law', description: 'LLB, LLM and law programs', icon: '⚖️', order: 7 },
  { name: 'Design', slug: 'design', description: 'Fashion, Interior and graphic design', icon: '🎨', order: 8 }
];

const courses = [
  { name: 'B.Tech', duration: '4 years', degreeType: 'Bachelor', fees: { min: 50000, max: 300000 } },
  { name: 'M.Tech', duration: '2 years', degreeType: 'Master', fees: { min: 30000, max: 200000 } },
  { name: 'MBA', duration: '2 years', degreeType: 'Master', fees: { min: 100000, max: 500000 } },
  { name: 'BBA', duration: '3 years', degreeType: 'Bachelor', fees: { min: 50000, max: 200000 } },
  { name: 'MBBS', duration: '5.5 years', degreeType: 'Bachelor', fees: { min: 500000, max: 2500000 } },
  { name: 'BDS', duration: '5 years', degreeType: 'Bachelor', fees: { min: 200000, max: 1000000 } },
  { name: 'B.Sc', duration: '3 years', degreeType: 'Bachelor', fees: { min: 20000, max: 100000 } },
  { name: 'B.Com', duration: '3 years', degreeType: 'Bachelor', fees: { min: 20000, max: 100000 } },
  { name: 'BA', duration: '3 years', degreeType: 'Bachelor', fees: { min: 15000, max: 80000 } },
  { name: 'LLB', duration: '3 years', degreeType: 'Bachelor', fees: { min: 30000, max: 200000 } }
];

const colleges = [
  { name: 'Indian Institute of Technology Delhi', slug: 'iit-delhi', city: 'New Delhi', state: 'Delhi', ownership: 'Government', rating: 4.8, nirfRank: 2, established: 1961, fees: { min: 200000, max: 300000 }, placements: { avg: 2500000, highest: 5000000, percentagePlaced: 95 }, thumbnail: 'https://images.unsplash.com/photo-1562774053-6d3b8c4e9b8a?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Indian Institute of Technology Bombay', slug: 'iit-bombay', city: 'Mumbai', state: 'Maharashtra', ownership: 'Government', rating: 4.9, nirfRank: 1, established: 1958, fees: { min: 200000, max: 300000 }, placements: { avg: 2800000, highest: 5500000, percentagePlaced: 98 }, thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Indian Institute of Technology Madras', slug: 'iit-madras', city: 'Chennai', state: 'Tamil Nadu', ownership: 'Government', rating: 4.7, nirfRank: 3, established: 1959, fees: { min: 200000, max: 300000 }, placements: { avg: 2400000, highest: 4800000, percentagePlaced: 96 }, thumbnail: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Indian Institute of Technology Kanpur', slug: 'iit-kanpur', city: 'Kanpur', state: 'Uttar Pradesh', ownership: 'Government', rating: 4.6, nirfRank: 4, established: 1959, fees: { min: 200000, max: 300000 }, placements: { avg: 2200000, highest: 4500000, percentagePlaced: 94 }, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'National Institute of Technology Trichy', slug: 'nit-trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu', ownership: 'Government', rating: 4.5, nirfRank: 8, established: 1964, fees: { min: 150000, max: 250000 }, placements: { avg: 1200000, highest: 2500000, percentagePlaced: 90 }, thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Birla Institute of Technology Mesra', slug: 'bit-mesra', city: 'Ranchi', state: 'Jharkhand', ownership: 'Private', rating: 4.2, nirfRank: 25, established: 1955, fees: { min: 200000, max: 400000 }, placements: { avg: 800000, highest: 1800000, percentagePlaced: 85 }, thumbnail: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800', featured: false, popular: true, streams: [], courses: [] },
  { name: 'VIT University', slug: 'vit-university', city: 'Vellore', state: 'Tamil Nadu', ownership: 'Private', rating: 4.3, nirfRank: 15, established: 1984, fees: { min: 180000, max: 400000 }, placements: { avg: 900000, highest: 2000000, percentagePlaced: 92 }, thumbnail: 'https://images.unsplash.com/photo-1562774053-6d3b8c4e9b8a?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Anna University', slug: 'anna-university', city: 'Chennai', state: 'Tamil Nadu', ownership: 'Government', rating: 4.1, nirfRank: 20, established: 1978, fees: { min: 40000, max: 150000 }, placements: { avg: 600000, highest: 1200000, percentagePlaced: 88 }, thumbnail: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800', featured: false, popular: true, streams: [], courses: [] },
  { name: 'Delhi University', slug: 'delhi-university', city: 'New Delhi', state: 'Delhi', ownership: 'Government', rating: 4.4, nirfRank: 10, established: 1922, fees: { min: 10000, max: 100000 }, placements: { avg: 700000, highest: 1500000, percentagePlaced: 80 }, thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Jawaharlal Nehru University', slug: 'jnu', city: 'New Delhi', state: 'Delhi', ownership: 'Government', rating: 4.3, nirfRank: 12, established: 1969, fees: { min: 5000, max: 50000 }, placements: { avg: 500000, highest: 1200000, percentagePlaced: 75 }, thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', featured: false, popular: false, streams: [], courses: [] },
  { name: 'All India Institute of Medical Sciences', slug: 'aiims-delhi', city: 'New Delhi', state: 'Delhi', ownership: 'Government', rating: 4.9, nirfRank: 1, established: 1956, fees: { min: 1000, max: 10000 }, placements: { avg: 2000000, highest: 5000000, percentagePlaced: 100 }, thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800', featured: true, popular: true, streams: [], courses: [] },
  { name: 'Christian Medical College Vellore', slug: 'cmc-vellore', city: 'Vellore', state: 'Tamil Nadu', ownership: 'Private', rating: 4.7, nirfRank: 3, established: 1900, fees: { min: 40000, max: 150000 }, placements: { avg: 1500000, highest: 3000000, percentagePlaced: 98 }, thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800', featured: true, popular: true, streams: [], courses: [] }
];

const facilities = ['Library', 'Labs', 'Sports Complex', 'Hostel', 'Cafeteria', 'Wi-Fi Campus', 'Medical Facility', 'Transportation', 'Gym', 'Auditorium'];

const topRecruiters = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Oracle', 'IBM', 'TCS', 'Infosys', 'Wipro'];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Stream.deleteMany({});
    await Course.deleteMany({});
    await College.deleteMany({});
    console.log('Cleared existing data');

    const createdStreams = await Stream.insertMany(streams);
    console.log(`Created ${createdStreams.length} streams`);

    const streamMap = {};
    createdStreams.forEach(s => streamMap[s.slug] = s._id);

    const courseDocs = courses.map(c => ({
      ...c,
      slug: c.name.toLowerCase().replace(/\./g, ''),
      stream: c.name.includes('B.Tech') || c.name.includes('M.Tech') ? streamMap['engineering'] :
              c.name.includes('MBA') || c.name.includes('BBA') ? streamMap['management'] :
              c.name.includes('MBBS') || c.name.includes('BDS') ? streamMap['medical'] :
              c.name.includes('B.Sc') || c.name.includes('M.Sc') ? streamMap['science'] :
              c.name.includes('B.Com') ? streamMap['commerce'] :
              c.name.includes('BA') || c.name.includes('MA') ? streamMap['arts-humanities'] :
              c.name.includes('LLB') ? streamMap['law'] : null
    }));

    const createdCourses = await Course.insertMany(courseDocs);
    console.log(`Created ${createdCourses.length} courses`);

    const courseMap = {};
    createdCourses.forEach(c => courseMap[c.name] = c._id);

    const collegeDocs = colleges.map((c, i) => ({
      ...c,
      streams: [streamMap['engineering'], streamMap['management'], streamMap['science']].slice(0, Math.floor(Math.random() * 3) + 1),
      courses: [courseMap['B.Tech'], courseMap['MBA'], courseMap['B.Sc']].filter(Boolean).slice(0, Math.floor(Math.random() * 3) + 1),
      facilities: facilities.slice(0, Math.floor(Math.random() * 6) + 4),
      placements: {
        ...c.placements,
        topRecruiters: topRecruiters.slice(0, Math.floor(Math.random() * 6) + 4)
      }
    }));

    const createdColleges = await College.insertMany(collegeDocs);
    console.log(`Created ${createdColleges.length} colleges`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
