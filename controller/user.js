const express = require("express")
const traveluser = require("../module/user.js")
const bcrypt = require("bcrypt")
const sendcookie = require("../utils/feature.js")

const register = async (req,res) => {

    const {name, gender, email, password} = req.body 
    const hashedpassword = await bcrypt.hash(password,10)


     const user = await traveluser.create({
        name,
        gender,
        email,
        password:hashedpassword
     })

     
     if(!user) return res.json({
        success: false,
        message: "child is created"
     })

     res.status(200).json({
        success: true,
        message: "register successfully"
     })
}


const login = async (req,res) => {
    const {email, password} = req.body

    const user = await traveluser.findOne({email})

    const checkedpassword = await bcrypt.compare(password,user.password) 

    
    if(!checkedpassword){
        return res.json({
           success: false,
           message: "password error"
        })
    }   

    sendcookie(user,res," cookie set successfully")
    
    res.status(200).json({
        success: true,
        message: "successfully login"
    })   

}


const logout = async(req, res) => {

    res.status(200).cookie("token", "",{
        expires :new Date(Date.now()),
        httpOnly: true,
        sameSite : "lax"
    }).json({
        success: true,
        message: "successful logout"
    })
}

module.exports = {
    register,
    login,
    logout
}