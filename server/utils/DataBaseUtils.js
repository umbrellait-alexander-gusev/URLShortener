import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Link';

const Link = mongoose.model('Link');

export function setUpConnection() {
    // mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    mongoose.connect(`mongodb://18.222.26.151/${config.db.name}`);
}

export function listLinks(id) {
    return Link.find();
}

export function createLink(data) {
    const link = new Link({
        URLShort: data.URLShort,
        URLOrigin: data.URLOrigin,
        createdAt: new Date()
    });

    return link.save();
}

export function deleteLink(id) {
    return Link.findById(id).remove();
}

