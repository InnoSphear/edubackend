import mongoose from 'mongoose';
import { fallbackBlogs as baseBlogs, fallbackColleges as baseColleges, fallbackExams as baseExams, fallbackNews as baseNews } from '../../frontend/src/data/fallbackContent.js';

const cloneItems = (items, target, mapFn) => Array.from({ length: target }, (_, i) => mapFn(items[i % items.length], i));

const mkCollege = (base, i, category, tag, suffix) => ({
  ...base,
  _id: `${base._id}-${suffix}-${i + 1}`,
  slug: `${base.slug}-${suffix}-${i + 1}`,
  name: i < (base.name.includes('-') ? 1 : 0) ? base.name : `${base.name} ${suffix.toUpperCase()} ${i + 1}`,
  category,
  tags: Array.from(new Set([...(base.tags || []), tag])),
  rating: Math.max(4.1, Math.min(4.9, (base.rating || 4.5) - (i % 3) * 0.1)),
  ranking: { ...(base.ranking || { authority: 'NIRF', rank: i + 1, year: 2025 }), rank: (base.ranking?.rank || i + 1) + i },
});

const engineeringBases = baseColleges.filter((c) => c.category === 'Engineering').slice(0, 10);
const managementBases = baseColleges.filter((c) => c.category === 'Management').slice(0, 10);
const privateMedicalBases = baseColleges.filter((c) => c.category === 'Private Medical').slice(0, 10);
const mbaBases = baseColleges.filter((c) => c.category === 'MBA').slice(0, 10);

export const fallbackColleges = [
  ...cloneItems(engineeringBases, 10, (b, i) => mkCollege(b, i, 'Engineering', 'engineering', 'eng')),
  ...cloneItems(managementBases, 10, (b, i) => mkCollege(b, i, 'Management', 'management', 'mgmt')),
  ...cloneItems(privateMedicalBases, 10, (b, i) => mkCollege(b, i, 'Private Medical', 'private-medical', 'pm')),
  ...cloneItems(mbaBases, 10, (b, i) => mkCollege(b, i, 'MBA', 'mba', 'mba')),
];

export const fallbackExams = cloneItems(baseExams, 10, (b, i) => ({
  ...b,
  _id: `${b._id}-${i + 1}`,
  slug: `${b.slug}-${i + 1}`,
  name: i < baseExams.length ? b.name : `${b.name.split(' ')[0]} ${2026 + i}`,
}));

export const fallbackBlogs = cloneItems(baseBlogs, 10, (b, i) => ({
  ...b,
  _id: `${b._id}-${i + 1}`,
  slug: `${b.slug}-${i + 1}`,
  title: i < baseBlogs.length ? b.title : `${b.title} ${i + 1}`,
  publishedAt: `2026-03-${String(10 + i).padStart(2, '0')}`,
}));

export const fallbackNews = cloneItems(baseNews, 10, (b, i) => ({
  ...b,
  _id: `${b._id}-${i + 1}`,
  slug: `${b.slug}-${i + 1}`,
  title: i < baseNews.length ? b.title : `${b.title} ${i + 1}`,
  publishedAt: `2026-03-${String(15 + i).padStart(2, '0')}`,
}));

export const isDbReady = () => mongoose.connection.readyState === 1;

export const paginate = (items = [], page = 1, limit = 10) => {
  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const start = (currentPage - 1) * currentLimit;
  const total = items.length;
  return { items: items.slice(start, start + currentLimit), pagination: { page: currentPage, limit: currentLimit, total, pages: Math.max(1, Math.ceil(total / currentLimit)) } };
};
