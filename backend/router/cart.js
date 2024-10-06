const express = require("express");
const { getCartItems, addToCart } = require("../controller/cart");
const auth = require("../middleware/auth");


const router = express.Router();

router.use(auth);

router.get('/cart',getCartItems);

router.post('/cart/add', addToCart);

module.exports = router;