const mongoose = require("mongoose");

async function connectMongoDB() {
    return (await mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')).isObjectIdOrHexString(() => console.log("MongoDB Connected!"))
}

module.exports = {
    connectMongoDB
}