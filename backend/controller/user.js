const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/updateMiddleware')

exports.signup = async (req,res , next)=>{
    try {
        const { name , email , password , phoneNumber , role } = req.body;
        const isExisting = await User.findOne({email : email});
        if(isExisting){
            const error = new Error("User already exist")
            error.name = "ExistingUserError";
            error.statusCode = 400;
            throw error;
        };

        // const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new User({name : name , email : email , password : password , phoneNumber  : phoneNumber , role});
        console.log("hello");
        await newUser.save();
        res.status(201).send({message : "Account created" , data : newUser});
    } catch (error) {
        next(error);
    }
};


exports.login = async (req,res,next)=>{
    try {
        const { email , password } = req.body;
        const isExisting = await User.findOne({email : email});

        if(!isExisting){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        };

        const isMatched = await bcrypt.compare(password , isExisting.password);

        if(!isMatched){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({id : isExisting._id , email : isExisting.email ,  role :  isExisting.role},process.env.JWT_SECRET,{expiresIn : "1h"});
        res.status(200).send({message : "User Logged-In" , data : isExisting  ,  token : token});

    } catch (error) {
        next(error);
    }
}

exports.getAllUsers = async (req,res,next)=>{
    try {
        // const users = await User.find({role : "User"});
        const users = await User.find();
        res.status(200).send({message : "User Fetched" , data : users});
    } catch (error) {
        next(error);
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        console.log("User ID from middleware:", req.user.id); // Debugging log

        const userId = req.user.id; // Extracted from the authMiddleware
        const user = await User.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, DOB, gender, profilePicture, additionalPhoneNumber, address } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.DOB = DOB || user.DOB;
        user.gender = gender || user.gender;
        user.profilePicture = profilePicture || user.profilePicture;
        user.additionalPhoneNumber = additionalPhoneNumber || user.additionalPhoneNumber;
        user.address = {
            country: address.country || user.address.country,
            state: address.state || user.address.state,
            city: address.city || user.address.city,
            zipCode: address.zipCode || user.address.zipCode,
            address1: address.address1 || user.address.address1,
        };

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
