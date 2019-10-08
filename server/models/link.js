import mongoose from "mongoose";

const schema = mongoose.Schema;

const linkSchema = new schema({
    shortUrl: {type: String},
    originUrl: {type: String},
    createdAt: {type: Date}
});

mongoose.model('Link', linkSchema);
