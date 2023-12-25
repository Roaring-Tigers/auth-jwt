const express = require('express');
const User = require('../models/User.models.js'); 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const checkLogin = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "You must be logged in"})
    }
    const token = authorization.replace("Bearer ", "");
    if(!token){
        return res.status(401).json({error: "You must be logged in"})
    }
    
   const response =  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_STRING)
   console.log(response);
   const found_user = await User.findById(response.id);
   req.user = found_user;
    next();

}

module.exports = checkLogin;