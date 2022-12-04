import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null, userType: '' },
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken, userType } = action.payload;
			state.user = user;
			state.token = accessToken;
			state.userType = userType;
		},
		logOut: (state, action) => {
			state.user = null;
			state.token = null;
			state.userType = '';
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserType = (state) => state.auth.userType;
