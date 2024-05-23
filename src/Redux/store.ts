import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

export const store = configureStore({
	reducer: {
		user: authSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
