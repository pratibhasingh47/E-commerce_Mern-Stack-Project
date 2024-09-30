import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/auth/signup", data);
        return response.data.data;
    } catch (error) {
        rejectWithValue(error);
    }
})

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/auth/login", data);
        localStorage.setItem("token", response.data.token);
        return response.data.data;
    } catch (error) {
        rejectWithValue(error);
    }
})

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/auth/getUsers");
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const updateUser = createAsyncThunk("auth/updateUserProfile", async (updatedData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.put("http://localhost:5000/auth/updateUserProfile", updatedData, config);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getUserProfile = createAsyncThunk('auth/getUserProfile', async () => {
    const response = await axios.get('http://localhost:5000/auth/getUserProfile');
    return response.data; 
});

const getRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
    }
    return null;
}

const initialState = {
    isLoading: false,
    user: null,
    error: null,
    isAuth: localStorage.getItem("token") ? true : false,
    role: getRole(),
    users: [],
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem("token");
            state.isAuth = false;
            state.role = null
        },
        loginWithGoogle: (state, action) => {
            localStorage.setItem("token", action.payload.token);
            state.user = action.payload.user,
                state.role = action.payload.role,
                state.isAuth = true
        },
        updateUserProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state, action) => {
                state.isLoading = true;
                state.user = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.role = action.payload.role;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload; 
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload; // Update the user state with the updated profile
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload; // Set user data to the state
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });

    }
})

export const { logOut, loginWithGoogle ,updateUserProfile  } = authSlice.actions;

export default authSlice.reducer;