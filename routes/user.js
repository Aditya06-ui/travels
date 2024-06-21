const express = require("express")
const router = express.Router();
const {register, login, logout } = require("../controller/user.js") 
const isauthenticated = require("../authentication/auth.js")


router.post("/register",register)
router.post("/login", login)
router.get("/logout",isauthenticated, logout)


module.exports =  router;

