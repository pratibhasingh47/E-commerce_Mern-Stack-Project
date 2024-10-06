// models/Item.js
const mongoose = require('mongoose');

// Define the Item schema
const ItemSchema = new mongoose.Schema({
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
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Assuming you have an Item model
        required: true
    },
    description: { // Add description here
        type: String,
        required: true
    },
    category: { // Add category here
        type: String,
        required: true
    }
    // Add any other fields relevant to the Item, e.g., description, category, etc.
});

// Create the model and export it
const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
