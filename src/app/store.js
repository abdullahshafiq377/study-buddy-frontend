import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/chats/usersApiSlice';
import chatsReducer from '../features/chats/chatsApiSlice';
import meetingsReducer from '../features/meetings/meetingsApiSlice';

export const store = configureStore({
	                                    reducer: {
		                                    [apiSlice.reducerPath]: apiSlice.reducer,
		                                    auth: authReducer,
		                                    users: usersReducer,
		                                    chats: chatsReducer,
		                                    meetings: meetingsReducer,
	                                    },
	                                    middleware: (getDefaultMiddleware) =>
		                                    getDefaultMiddleware()
			                                    .concat(apiSlice.middleware),
	                                    devTools: true,
                                    });
