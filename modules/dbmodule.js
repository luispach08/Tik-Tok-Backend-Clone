const mongoose = require('mongoose');

const tiktokSchema = mongoose.Schema({
    url: String,
    chanel: String,
    song: String,
    likes: String,
    messages: String,
    description: String,
    shares: String,
});

module.exports = mongoose.model("tiktokVideos", tiktokSchema);