const mongoose = require('mongoose');
const Item = require('./item');

// Updated CartItemSchema to include product details
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have an Item model
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    description: { // Add description here
        type: String,
        required: true
    },
    category: { // Add category here
        type: String,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    items: [CartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
