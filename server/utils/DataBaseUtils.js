import mongoose from "mongoose";
import '../models/Link';

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve("./.env")
});

const Link = mongoose.model('Link');

export function setUpConnection() {
    mongoose.connect(`mongodb://${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}/${process.env.REACT_APP_DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => console.error(err));
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
    return Link.findById(id).deleteOne();
}