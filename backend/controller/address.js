const Address = require('../model/address');

const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user._id;  
        const userEmail = req.user.email; // Extract user email from the decoded token

        // Validate input
        if (!address) {
            return res.status(400).json({ message: 'Address is required.' });
        }

        // Create a new address entry in the database
        const newAddress = new Address({
            address,
            userId,
            userEmail, // Include userEmail in the address document
        });

        await newAddress.save();

        res.status(201).json({ message: 'Address added successfully.', data: newAddress });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

module.exports = { addAddress };
