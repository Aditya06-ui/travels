const jwt = require("jsonwebtoken")
const traveluser = require("../module/user")


const isauthenticated = async(req,res,next) => {

    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: " login please "
        })
    }

    const decoded = jwt.verify(token, process.env.jwt_secret_key)

    req.user = await traveluser.findById({_id:decoded._id})
    
    next()

}

module.exports = isauthenticated