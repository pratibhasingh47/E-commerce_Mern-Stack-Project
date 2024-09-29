import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'light', // Example initial theme
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'; // Toggles between light and dark theme
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
