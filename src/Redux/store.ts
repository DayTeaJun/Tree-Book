import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import DarkModeSlice from './DarkModeSlice';

export const store = configureStore({
	reducer: {
		user: authSlice,
		darkMode: DarkModeSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
