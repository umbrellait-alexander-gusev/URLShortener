import mongoose from 'mongoose';

const schema = mongoose.Schema;

const linkSchema = new schema({
  slug: { type: String },
  url: { type: String },
  createdAt: { type: Date },
});

mongoose.model('Link', linkSchema);
