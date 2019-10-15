import mongoose from 'mongoose';
import '../models/link';
import { env } from '../config/config';

const links = mongoose.model('Link');

const dbHost = env.db_host;
const dbPort = env.db_port;
const dbName = env.db_name;

export function convertModel(entity) {
  if (!entity) {
    return entity;
  }

  const cleaned = entity.toObject();
  cleaned.id = cleaned._id.toString();
  delete cleaned._id;
  delete cleaned.__v;
  return cleaned;
}

export function setUpConnection() {
  mongoose
    .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.error(err));
}

export function listLinks() {
  return links.find();
}

export function createLink(data) {
  const link = new links({
    slug: data.slug,
    url: data.url,
    createdAt: new Date(),
  });

  return link.save();
}

export function deleteLink(id) {
  return links.findById(id).deleteOne();
}

export function uniqueSlug(slug) {
  return links.find({ slug: slug }).then((links) => !!links.length);
}

export function getUrl(slug) {
  return links.findOne({ slug: slug }).then((link) => convertModel(link).url);
}
