const mongoose = require("mongoose")

const registerschema = new mongoose.Schema({
    
    name : String,
    gender: String,
    email : String,
    password: String 
})

const traveluser = mongoose.model("user", registerschema)

module.exports = traveluser

