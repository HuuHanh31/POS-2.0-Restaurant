const mongoose = require('mongoose');
const { Schema } = mongoose;
const newSchame = new Schema({
    name: String
})

module.exports = mongoose.model('new', newSchame);