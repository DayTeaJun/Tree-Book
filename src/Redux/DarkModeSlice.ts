import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
	mode: 'light' | 'dark';
}

const initialState: initialStateType = {
	mode:
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
			? 'dark'
			: 'light',
};

const updateDarkMode = (mode: string) => {
	localStorage.theme = mode;
};

export const darkModeSlice = createSlice({
	name: 'darkMode',
	initialState,
	reducers: {
		toggleDarkMode: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
			updateDarkMode(state.mode);
		},
	},
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
