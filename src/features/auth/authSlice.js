import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null, userType: null, userId: null},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken, userType, userId} = action.payload;
            state.user = user;
            state.token = accessToken;
            state.userType = userType;
            state.userId = userId;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.userType = null;
            state.userId = null;
        },
    },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserType = (state) => state.auth.userType;
export const selectCurrentUserId = (state) => state.auth.userId;
