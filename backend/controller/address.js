const Address = require('../model/address');

exports.addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user._id;  
        const userEmail = req.user.email;

        
        if (!address) {
            return res.status(400).json({ message: 'Address is required.' });
        }

        
        const newAddress = new Address({
            address,
            userId,
            userEmail, 
        });

        await newAddress.save();

        res.status(201).json({ message: 'Address added successfully.', data: newAddress });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

