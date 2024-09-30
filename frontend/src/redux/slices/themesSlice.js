import { createSlice } from '@reduxjs/toolkit';

// Function to get the theme from localStorage (with fallback to 'light')
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: getInitialTheme(), // Load initial theme from localStorage
    },
    reducers: {
        toggleTheme: (state) => {
            // Toggle between light and dark themes
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;

            // Save the updated theme in localStorage
            localStorage.setItem('theme', newTheme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
