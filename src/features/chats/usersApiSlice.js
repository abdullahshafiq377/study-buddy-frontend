import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter({
	                                         sortComparer: (a, b) => b.date.localeCompare(a.date),
                                         });

const initialState = usersAdapter.getInitialState({
	                                                  onlineUsers: [],
	                                                  onlineUserIds: []
                                                  });
const usersSlice = createSlice({
	                               name: 'users',
	                               initialState,
	                               reducers: {
		                               setOnlineUsers (state, action) {
			                               const {onlineUsers} = action.payload;
			                               state.onlineUsers = onlineUsers;
		                               },
	                               },
                               });

export const getOnlineUsers = (state) => state.users.onlineUsers;
export const {setOnlineUsers, setOnlineUserIds} = usersSlice.actions;

export default usersSlice.reducer;
