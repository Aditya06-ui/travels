const mongoose = require("mongoose")

const travelschema  = new mongoose.Schema({
    name:{
         type: String,
         required: true
    },
    phone_no : {
        type: Number,
        required: true
    },
    number_of_traveler : {
        type: Number,
        required: true
    },
    stay_day : {
        type: Number,
        required:true
    },
    pickup_location: { 
        type: String,
        required: true
    },
    destination : {
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user", 
    },
    date_of_booking : {
        type: Date,
        required: true,
    }
})


const traveldetail = mongoose.model("traveldetail", travelschema)

module.exports = traveldetail