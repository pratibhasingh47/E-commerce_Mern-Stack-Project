import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// This assumes you are storing the JWT token in local storage
export const addAddress = createAsyncThunk(
    'auth/addAddress',
    async (address, { rejectWithValue }) => {
        try {
            // Retrieve the token from local storage (or wherever you're storing it)
            const token = localStorage.getItem('token'); // Adjust this if necessary

            // Make the POST request with the token in headers
            const response = await axios.post(
                'http://localhost:5000/auth/addAddress',
                { address },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the Authorization header
                    },
                }
            );

            return response.data; // Adjust if your response structure is different
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to add address');
        }
    }
);

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: '',
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload.data; // Ensure this aligns with your response structure
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;
