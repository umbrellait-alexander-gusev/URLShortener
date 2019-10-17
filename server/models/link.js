import mongoose from 'mongoose';
import { env } from '../config/config';
const timeRemoveLink = env.db_remove_link;

const schema = mongoose.Schema;
const linkSchema = new schema({
  slug: { type: String, unique: true, index: true },
  url: { type: String },
  createdAt: { type: Date, default: Date.now, expires: timeRemoveLink },
});

mongoose.set('useCreateIndex', true);
mongoose.model('Link', linkSchema);
