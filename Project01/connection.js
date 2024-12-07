const mongoose = require("mongoose");

async function connectMongoDB() {
    return mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
}

module.exports = {
    connectMongoDB
}