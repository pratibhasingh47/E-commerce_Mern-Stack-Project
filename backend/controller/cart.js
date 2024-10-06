// const Cart = require('../model/cart');

// exports.getCartItems = async (req, res) => {
//     const userId = req.user?._id; // Get the userId from the authenticated user
//     if (!userId) {
//         return res.status(401).json({ message: 'User not authenticated' });
//     }

//     try {
//         const cart = await Cart.findOne({ userId }).populate('items.productId');
//         if (!cart || cart.items.length === 0) {
//             return res.status(204).json(); // No content
//         }
//         res.status(200).json({ cartItems: cart.items });
//     } catch (error) {
//         console.error("Error fetching cart items:", error); // Log the error
//         res.status(500).json({ message: 'Error fetching cart items' });
//     }
// };

// exports.addToCart = async (req, res) => {
//     const { productId, name, quantity = 1, price, productUrl } = req.body; // Default quantity to 1
//     const userId = req.user?._id;

//     // Validate request body
//     if (!productId || !name || !price) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     console.log("Adding to cart:", { userId, productId, name, quantity, price, productUrl }); // Debug log

//     try {
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             cart = new Cart({ userId, items: [] });
//         }

//         const existingItem = cart.items.find(item => item.productId.toString() === productId);
//         if (existingItem) {
//             existingItem.quantity += quantity; // Increment by the specified quantity
//         } else {
//             cart.items.push({ productId, name, quantity, price, productUrl }); // Use provided quantity
//         }

//         await cart.save();
//         console.log("Updated cart:", cart); // Debug log
//         res.status(200).json({ message: 'Item added to cart', cartItems: cart.items });
//     } catch (error) {
//         console.error("Error adding to cart:", error); // Log error
//         res.status(500).json({ message: 'Error adding to cart' });
//     }
// };







const Cart = require('../model/cart');

// Get cart by user (if logged in) or return empty if not
const getCart = async (req, res) => {
    const { userId } = req;
    try {
        if (userId) {
            const cart = await Cart.findOne({ userId });
            if (cart) {
                return res.status(200).json(cart);
            } else {
                return res.status(200).json({ items: [] });
            }
        } else {
            // For guest users, return an empty cart or use localStorage on the frontend
            return res.status(200).json({ items: [] });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching cart' });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    const { productId, name, price, productUrl, quantity } = req.body;
    const { userId } = req;

    if (!userId) {
        // Guest user flow: Handle this on the frontend by storing in localStorage
        return res.status(400).json({ message: 'User not logged in. Store cart in localStorage.' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if the product already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));

            if (existingItemIndex >= 0) {
                // Update quantity if item already exists
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cart.items.push({ productId, name, price, productUrl, quantity });
            }
        } else {
            // Create new cart for the user
            cart = new Cart({
                userId,
                items: [{ productId, name, price, productUrl, quantity }]
            });
        }

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: 'Error adding to cart' });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const { userId } = req;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the product from cart
        cart.items = cart.items.filter(item => !item.productId.equals(productId));

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: 'Error removing from cart' });
    }
};

// Clear the entire cart
const clearCart = async (req, res) => {
    const { userId } = req;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Clear all items in the cart
        cart.items = [];
        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: 'Error clearing cart' });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};
