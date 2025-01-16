const mongoose = require('mongoose');


// models/Discussion.js
const discussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: {type: Number, default: 0, required: true},
    dislikes: {type: Number,default:0, required: true},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Discussion', discussionSchema);