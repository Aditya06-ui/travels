const express = require("express")
const router = express.Router()
const isauthenticated = require("../authentication/auth.js")
const { newtraveler, booked_trip, updatetravellerdetail, canceltrip } = require("../controller/traveller.js")

 router.post("/newtraveler", isauthenticated, newtraveler)
 router.get("/mytrip", isauthenticated, booked_trip)
 router.put("/update/:id", isauthenticated, updatetravellerdetail)
 router.delete("/delete", isauthenticated, canceltrip)

module.exports = router

