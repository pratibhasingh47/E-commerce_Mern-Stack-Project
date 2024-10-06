const express = require("express");
const { getCart, addToCart , clearCart , removeFromCart } = require("../controller/cart");
const auth = require("../middleware/auth");


const router = express.Router();

router.get('/cart', auth,getCart);

router.post('/cart/add', auth,addToCart);

router.delete('/cart/remove', auth, removeFromCart);

router.post('/cart/clear', auth,clearCart);

module.exports = router;