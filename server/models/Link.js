const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    URLShort: {type: String},
    URLOrigin: {type: String},
    createdAt: {type: Date}
});

mongoose.model('Link', LinkSchema);
