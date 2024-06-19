const jwt = require("jsonwebtoken")

const sendcookie = (userss,res,message) => {

    const token = jwt.sign({_id: userss._id},"tyghbbhbhjhgbhjbh")

    res.cookie("token", token,{
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        sameSite : "lax"
    })
}

module.exports = sendcookie