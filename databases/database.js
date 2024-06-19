const mongoose = require("mongoose")

const db = () => {
    mongoose.connect(process.env.mongoose_url)
    .then(console.log("database connected"))
    .catch((err) => console.log("failed to connect" + err))
}

module.exports = db;