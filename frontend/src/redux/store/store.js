import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productSlice from "../slices/productSlice";
import themeReducer from '../slices/themesSlice';
import cartSlice from "../slices/cartSlice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        product : productSlice,
        theme: themeReducer,
        cart : cartSlice
    }
});

export default store;