import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    cartItem: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItem.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItem.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItem));
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItem.find(item => item.name === action.payload);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItem));
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItem.find(item => item.name === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                // Remove the item from the cart if quantity is 1 and user decrements it
                state.cartItem = state.cartItem.filter(cartItem => cartItem.name !== action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItem));
        },
        clearCart: (state) => {
            state.cartItem = [];
            localStorage.setItem("cart", JSON.stringify([]));
        }
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
