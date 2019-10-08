import mongoose from "mongoose";
import '../models/link';
import { env } from '../config/config'

const DbHost = env.db_host;
const DbPort = env.db_port;
const DbName = env.db_name;

const Link = mongoose.model('Link');

export function setUpConnection() {
    mongoose.connect(`mongodb://${DbHost}:${DbPort}/${DbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => console.error(err));
}

export function listLinks(id) {
    return Link.find();
}

export function createLink(data) {
    const link = new Link({
        shortUrl: data.shortUrl,
        originUrl: data.originUrl,
        createdAt: new Date()
    });

    return link.save();
}

export function deleteLink(id) {
  return Link.findById(id).deleteOne();
}
