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

// Controller to get cart items for logged-in user
const getCartItems = async (req, res) => {
    try {
        const userId = req.userId; // Assuming this is populated by middleware

        // Fetch the cart and populate the product details based on the user's ID
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price productUrl description category');

        if (!cart) {
            // If no cart exists for the user, return an empty array
            return res.status(200).json({ items: [] });
        }

        // If the cart exists, map over the items to include product 
        // console.log(cart.items);
        const cartItems = cart.items.map((item) => ({

            productId: item.productId,
            name: item.name,
            price: item.price,
            productUrl: item.productUrl,
            description: item.description,
            category: item.category,
            quantity: item.quantity
        }));

        return res.status(200).json({ items: cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// const addToCart = async (req, res) => {
//     const userId = req.userId; // Get user ID from the decoded token
//     const { productId, quantity, name, price, productUrl } = req.body; // Destructure necessary fields from request body

//     // Validate required fields
//     if (!userId || !productId || !name || !price || !productUrl) {
//         return res.status(400).json({ message: "User ID, Product ID, name, price, and productUrl are required." });
//     }

//     try {
//         // Find the user's cart or create one if it doesn't exist
//         let cart = await Cart.findOne({ userId: userId });
//         if (!cart) {
//             // Create a new cart for the user
//             cart = new Cart({ userId: userId, items: [] });
//         }

//         // Check if the product already exists in the cart
//         const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//         if (existingItemIndex > -1) {
//             // Update the quantity of the existing item
//             cart.items[existingItemIndex].quantity += quantity; // Update the quantity
//         } else {
//             // Add new item to cart
//             const newItem = {
//                 productId,
//                 quantity,
//                 name,
//                 price,
//                 productUrl
//             };
//             cart.items.push(newItem); // Add the new item
//         }

//         // Save the updated cart
//         await cart.save();
//         res.status(200).json({ message: "Item added to cart successfully", cart });
//     } catch (error) {
//         console.error("Error adding item to cart:", error);
//         res.status(500).json({ message: "An error occurred while adding item to cart", error });
//     }
// };


const addToCart = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity, name, price, productUrl, operation, description, category } = req.body; // Destructure necessary fields
    // console.log(req.body);
    // Validate required fields
    if (!userId || !productId || !name || !price || !productUrl) {
        return res.status(400).json({ message: "User ID, Product ID, name, price, and productUrl are required." });
    }

    try {
        // Find the user's cart or create one if it doesn't exist
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            // Create a new cart for the user
            cart = new Cart({ userId: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            // Update the quantity of the existing item
            if (operation === 'increment') {
                cart.items[existingItemIndex].quantity += quantity; // Increment the quantity
            } else if (operation === 'decrement') {
                // Decrement the quantity but ensure it doesn't go below 0
                if (cart.items[existingItemIndex].quantity > 0) {
                    cart.items[existingItemIndex].quantity -= quantity; // Decrement the quantity
                    // Optionally remove the item if the quantity is zero
                    if (cart.items[existingItemIndex].quantity === 0) {
                        cart.items.splice(existingItemIndex, 1); // Remove item if quantity is 0
                    }
                }
            }
        } else {
            // Add new item to cart only if operation is not decrement
            if (operation !== 'decrement') {
                const newItem = {
                    productId,
                    quantity,
                    name,
                    price,
                    productUrl,
                    category,
                    description
                };
                cart.items.push(newItem); // Add the new item
            }
        }

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "An error occurred while updating the cart", error });
    }
};



module.exports = { getCartItems, addToCart };
