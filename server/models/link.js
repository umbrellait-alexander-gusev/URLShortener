import mongoose from 'mongoose';

const schema = mongoose.Schema;

const linkSchema = new schema({
  slug: { type: String, unique: true, index: true },
  url: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 5 },
});

mongoose.set('useCreateIndex', true);
mongoose.model('Link', linkSchema);
