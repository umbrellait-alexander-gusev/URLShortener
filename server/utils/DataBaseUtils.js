import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Link';

const Link = mongoose.model('Link');

mongoose.connection.on('error', err => {
    logError(err);
});

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`).catch(err=>console.log(err));
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