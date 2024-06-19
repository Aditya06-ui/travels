const mongoose = require("mongoose")

const db = () => {
    mongoose.connect(process.env.mongoose_url)
    .then((c) => console.log(`database connected to ${c.connection.host}`))
    .catch((err) => console.log("failed to connect" + err))
}

module.exports = db;