const Cart = require('../model/cart');

exports.getCartItems = async (req, res) => {
    const userId = req.user?._id; // Get the userId from the authenticated user
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(204).json(); // No content
        }
        res.status(200).json({ cartItems: cart.items });
    } catch (error) {
        console.error("Error fetching cart items:", error); // Log the error
        res.status(500).json({ message: 'Error fetching cart items' });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, name, quantity = 1, price, productUrl } = req.body; // Default quantity to 1
    const userId = req.user?._id;

    // Validate request body
    if (!productId || !name || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log("Adding to cart:", { userId, productId, name, quantity, price, productUrl }); // Debug log

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Increment by the specified quantity
        } else {
            cart.items.push({ productId, name, quantity, price, productUrl }); // Use provided quantity
        }

        await cart.save();
        console.log("Updated cart:", cart); // Debug log
        res.status(200).json({ message: 'Item added to cart', cartItems: cart.items });
    } catch (error) {
        console.error("Error adding to cart:", error); // Log error
        res.status(500).json({ message: 'Error adding to cart' });
    }
};
