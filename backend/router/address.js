// routes/addressRoutes.js
const express = require('express');
const Address = require("../model/address");
const router = express.Router();
const authMiddleware = require('../middleware/updateMiddleware');  // Assuming you have authentication


router.post('/addAddress', authMiddleware, async (req, res) => {
    const { address } = req.body;
    const userId = req.user.id; // Assuming user ID is decoded from the token
    const userEmail = req.user.email; // Assuming email is included in the token

    // Log to check userEmail and userId
    console.log("User ID:", userId);
    console.log("User Email:", userEmail);

    try {
        const newAddress = new Address({
            address,
            userId,
            userEmail, 
        });
        
        await newAddress.save();
        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
