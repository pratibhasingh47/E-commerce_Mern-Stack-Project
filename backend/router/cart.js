const express = require("express");
const { getCartItems, addToCart } = require("../controller/cart");
const authMiddleware = require("../middleware/updateMiddleware");


const router = express.Router();

router.get('/getCartItems', authMiddleware, getCartItems);
router.post('/addToCart', authMiddleware, addToCart);

module.exports = router;