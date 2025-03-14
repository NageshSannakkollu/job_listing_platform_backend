const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userRegistration = async(req,res) => {
    const {username,password,email,mobile,role} = req.body;
    const userDetails = req.body;
    console.log("userDetails:",userDetails)
    User.create(username,email,password,mobile,role,(err,newUser) => {
        if(err){
            return res.status(200).json({message:"Email already exists",success:false})
        }
        return res.status(201).json({message:"New User Created Successfully!",user:newUser,success:true})
    });
};

const loginUser = async(req,res) => {
    const {email,password} = req.body;
    // const userDetails = req.body;
    // console.log("userDetails:",userDetails)
    User.getByEmail(email,async(err,user) => {
        if(err || user===undefined){
            // console.log("Error:",err)
            return res.status(200).json({message:"Invalid Email..",success:false})
        }
        const isMatch = await bcrypt.compare(password,user.password) 
        // console.log("isMatch:",isMatch)
        if(!isMatch){
            return res.status(200).json({message:"Invalid password!!",success:false})
        }else{
            const payload = {email:email} 
            const token = jwt.sign(payload,`${process.env.JWT_SECRET}`)
            res.status(200).json({jwtToken:token,success:true,message:"Login Success",user})
        }  
    })
}

const profileDetails = (req,res) => {
    const {email} = req;
    console.log("Email:",email)
    User.getProfileEmail(email,async(err,user) => {
        if(err || user===undefined){
            // console.log("Error:",err)
            return res.status(200).json({message:"Invalid Email..",success:false})
        }else{
            return res.status(200).json({user})
        }
    })
}

module.exports = {userRegistration,loginUser,profileDetails}