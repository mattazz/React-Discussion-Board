const mongoose = require('mongoose');

// models/Post.js
const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: {type: Number, default: 0, required: true},
    dislikes: {type: Number, default: 0, required: true}
});

module.exports = mongoose.model('Post', postSchema);
