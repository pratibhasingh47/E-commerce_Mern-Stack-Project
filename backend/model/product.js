const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : [ true , "Product name is required"],
        minlength : [ 3 , "Product name must be atleast 3 letters"]
    },
    price : {
        type : Number,
        required : [ true , " Product price is required"],
        min : [ 0 , "Price should be greater than 0"]
    },
    description : {
        type : String,
        required : [ true , "Product description is required"],
        minlength : [10 , "Description should be atleast 10 characters long"]
    },
    category : {
        type : String,
        required : [ true , "Category is required"]
    },
    productUrl : {
        type : String,
        required : [ true , "Product URl is required"]
    }
});

module.exports = mongoose.model("Product",productSchema);