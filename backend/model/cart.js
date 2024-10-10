const mongoose = require('mongoose');
const Item = require('./item');


const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
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
    description: { 
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    items: [CartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
