const express = require('express');
const User = require('../models/User.models');
const authRouter = express.Router();
const checkLogin = require('../middleware/checkLogin');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();



authRouter.post('/signup', async (req, res) => {

    const { name, email, password } = req.body; 

    // validation: 

    // also check if email is already registered or not: 

    const newUser = new User({
        name,
        email,
        password,
    })
    
    try{
       const created_user =  await newUser.save();
       let user = {id: created_user._id}
       const access_token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET_STRING)

         res.status(200).json({data: created_user, access_token})
    }

    catch(err){
        console.log(err);
    }

})


authRouter.get('/secret',checkLogin, async (req, res) => {
    res.status(200).json({message: "You have access to super power"})
})



module.exports = authRouter;