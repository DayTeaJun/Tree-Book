import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface initialStateType {
	user: User | null;
	isAuthReady: boolean;
}

const initialState: initialStateType = {
	user: null,
	isAuthReady: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload;
			state.isAuthReady = true;
		},
		loginAuth: (state, action) => {
			state.user = action.payload;
		},
		logoutAuth: (state, action) => {
			state.user = null;
		},
	},
});

export const { setAuth, loginAuth, logoutAuth } = authSlice.actions;

export default authSlice.reducer;
