// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     isLoading: false,
//     error: null,
//     cartItem: JSON.parse(localStorage.getItem("cart")) || [],
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const existingItem = state.cartItem.find(item => item.name === action.payload.name);
//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 state.cartItem.push({ ...action.payload, quantity: 1 });
//             }
//             localStorage.setItem("cart", JSON.stringify(state.cartItem));
//         },
//         incrementQuantity: (state, action) => {
//             const item = state.cartItem.find(item => item.name === action.payload);
//             if (item) {
//                 item.quantity += 1;
//             }
//             localStorage.setItem("cart", JSON.stringify(state.cartItem));
//         },
//         decrementQuantity: (state, action) => {
//             const item = state.cartItem.find(item => item.name === action.payload);
//             if (item && item.quantity > 1) {
//                 item.quantity -= 1;
//             } else if (item && item.quantity === 1) {
//                 // Remove the item from the cart if quantity is 1 and user decrements it
//                 state.cartItem = state.cartItem.filter(cartItem => cartItem.name !== action.payload);
//             }
//             localStorage.setItem("cart", JSON.stringify(state.cartItem));
//         },
//         clearCart: (state) => {
//             state.cartItem = [];
//             localStorage.setItem("cart", JSON.stringify([]));
//         }
//     },
// });

// export const { addToCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;









// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Helper function to persist cart to localStorage
// const saveCartToLocalStorage = (cart) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
// };

// // Helper function to get cart from localStorage
// const getCartFromLocalStorage = () => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
// };

// // Async thunk to fetch cart from backend or localStorage
// export const fetchCartAsync = createAsyncThunk(
//     "api/cart",
//     async (_, { getState, rejectWithValue }) => {
//         const { auth } = getState();
//         try {
//             if (auth.isAuth) {
//                 // const token = auth.token; // Get the token from auth
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get("http://localhost:5000/api/cart", {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Include the token in the headers
//                     },
//                 });
//                 return response.data.items; // Return cart from backend
//             } else {
//                 // Fetch cart from localStorage for guest users
//                 return getCartFromLocalStorage();
//             }
//         } catch (error) {
//             return rejectWithValue("Failed to fetch cart.");
//         }
//     }
// );

// export const addToCartAsync = createAsyncThunk(
//     "api/cart/add",
//     async (item, { getState, rejectWithValue }) => {
//         const { auth, cart } = getState();
//         try {
//             // Guest user handling with localStorage
//             if (!auth.isAuth) {
//                 const updatedCart = [...cart.cartItem];
//                 const existingItem = updatedCart.find(cartItem => cartItem.productId === item.productId);

//                 if (existingItem) {
//                     existingItem.quantity += item.quantity;
//                 } else {
//                     updatedCart.push({ ...item, quantity: item.quantity });
//                 }

//                 saveCartToLocalStorage(updatedCart);
//                 return updatedCart;
//             }

//             // Logged-in user handling
//             const token = localStorage.getItem("token");
//             const response = await axios.post(
//                 "http://localhost:5000/api/cart/add",
//                 { 
//                     productId: item.productId,  // Use item.productId
//                     name: item.name,             // Use item.name
//                     quantity: item.quantity,     // Use item.quantity
//                     price: item.price,           // Use item.price
//                     productUrl: item.productUrl, // Use item.productUrl
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             return response.data.cart.items; // Assuming your API returns the updated cart
//         } catch (error) {
//             return rejectWithValue("Failed to add item to cart.");
//         }
//     }
// );

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         isLoading: false,
//         error: null,
//         cartItem: getCartFromLocalStorage(),
//     },
//     reducers: {
//         incrementQuantity: (state, action) => {
//             const productId = action.payload;
//             const item = state.cartItem.find(cartItem => cartItem.productId === productId);
//             if (item) {
//                 item.quantity += 1;
//                 saveCartToLocalStorage(state.cartItem);
//             }
//         },
//         decrementQuantity: (state, action) => {
//             const productId = action.payload;
//             const item = state.cartItem.find(cartItem => cartItem.productId === productId);
//             if (item && item.quantity > 1) {
//                 item.quantity -= 1;
//                 saveCartToLocalStorage(state.cartItem);
//             } else {
//                 state.cartItem = state.cartItem.filter(cartItem => cartItem.productId !== productId);
//                 saveCartToLocalStorage(state.cartItem);
//             }
//         },
//         clearCart: (state) => {
//             state.cartItem = [];
//             saveCartToLocalStorage([]);
//         },
//     },
//     extraReducers: (builder) => {
//         // Fetch cart
//         builder.addCase(fetchCartAsync.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.cartItem = action.payload;
//         });
//         builder.addCase(fetchCartAsync.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         });

//         // Add to cart
//         builder.addCase(addToCartAsync.fulfilled, (state, action) => {
//             state.cartItem = action.payload; // Set the updated cart
//             saveCartToLocalStorage(state.cartItem); // Save to localStorage after backend sync
//         });
//         builder.addCase(addToCartAsync.rejected, (state, action) => {
//             state.error = action.payload; // Handle error case
//         });
//     },
// });

// export const { incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;













import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const fetchCartAsync = createAsyncThunk(
    "api/cart",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState();
        try {
            if (auth.isAuth) {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                localStorage.setItem('cartItems', JSON.stringify(response.data.items));
                // console.log(response.data.items);
                return response.data.items;
            } else {
                return getCartFromLocalStorage();
            }
        } catch (error) {
            return rejectWithValue("Failed to fetch cart.");
        }
    }
);

// Async thunk to add/update item in the cart
// export const addToCartAsync = createAsyncThunk(
//     "api/cart/add",
//     async ({ item, operation }, { getState, rejectWithValue }) => {
//         const { auth } = getState();
//         try {
//             // Guest user handling with localStorage
//             if (!auth.isAuth) {
//                 const updatedCart = [...getCartFromLocalStorage()];
//                 const existingItem = updatedCart.find(cartItem => cartItem.productId === item.productId);

//                 if (existingItem) {
//                     if (operation === 'increment') {
//                         existingItem.quantity += item.quantity; // Increment quantity
//                     } else if (operation === 'decrement') {
//                         existingItem.quantity -= item.quantity; // Decrement quantity
//                         // Remove item if quantity is 0
//                         if (existingItem.quantity <= 0) {
//                             return updatedCart.filter(cartItem => cartItem.productId !== item.productId);
//                         }
//                     }
//                 } else if (operation === 'increment') {
//                     updatedCart.push({ ...item, quantity: item.quantity });
//                 }

//                 saveCartToLocalStorage(updatedCart);
//                 return updatedCart;
//             }

//             // Logged-in user handling
//             const token = localStorage.getItem("token");
//             const response = await axios.post(
//                 "http://localhost:5000/api/cart/add",
//                 { 
//                     productId: item.productId,
//                     quantity: item.quantity,
//                     name: item.name,
//                     price: item.price,
//                     productUrl: item.productUrl,
//                     operation, // Pass the operation to the backend
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             return response.data.cart.items; // Assuming your API returns the updated cart
//         } catch (error) {
//             return rejectWithValue("Failed to add/update item in cart.");
//         }
//     }
// );



export const addToCartAsync = createAsyncThunk(
    "api/cart/add",
    async (item, { getState, rejectWithValue }) => {
        const { auth } = getState();
        try {

            if (!auth.isAuth) {
                const updatedCart = [...getCartFromLocalStorage()];
                console.log(updatedCart)
                console.log(item)
                const existingItem = updatedCart.find(cartItem => cartItem.productId._id === item.productId._id);
                console.log(existingItem)
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    updatedCart.push({ ...item, quantity: item.quantity });
                }

                saveCartToLocalStorage(updatedCart);
                return updatedCart;
            }


            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/api/cart/add",
                {
                    productId: item.productId,
                    quantity: item.quantity,
                    name: item.name,
                    price: item.price,
                    productUrl: item.productUrl,
                    description: item.description,
                    category: item.category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.cart.items;
        } catch (error) {
            return rejectWithValue("Failed to add/update item in cart.");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        error: null,
        cartItem: getCartFromLocalStorage(),
    },
    reducers: {
        incrementQuantity: (state, action) => {
            const productId = action.payload;
            console.log(productId._id)
            const item = state.cartItem.find(cartItem => cartItem.productId._id === productId._id);
            console.log(item)
            if (item) {
                item.quantity += 1;
                saveCartToLocalStorage(state.cartItem);
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.cartItem.find(cartItem => cartItem.productId === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCartToLocalStorage(state.cartItem);
            } else {
                state.cartItem = state.cartItem.filter(cartItem => cartItem.productId !== productId);
                saveCartToLocalStorage(state.cartItem);
            }
        },
        clearCart: (state) => {
            state.cartItem = [];
            localStorage.removeItem("cartItems");
        },
        resetCart: (state) => {
            state.cartItem = getCartFromLocalStorage();
        }
    },
    extraReducers: (builder) => {
        // Fetch cart
        builder.addCase(fetchCartAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItem = action.payload;
        });
        builder.addCase(fetchCartAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Add/update to cart
        builder.addCase(addToCartAsync.fulfilled, (state, action) => {
            state.cartItem = action.payload;
            saveCartToLocalStorage(state.cartItem);
        });
        builder.addCase(addToCartAsync.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { incrementQuantity, decrementQuantity, clearCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
