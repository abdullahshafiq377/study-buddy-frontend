import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const chatsAdapter = createEntityAdapter();

const initialState = chatsAdapter.getInitialState({
	                                                  chosenChatDetails: null,
	                                                  chatType: null,
	                                                  messages: [],
	                                                  conversations: []
                                                  });
const chatsSlice = createSlice({
	                               name: 'chats', initialState,
	                               reducers: {
		                               setChosenChatDetails (state, action) {
			                               const {chatDetails, chatType} = action.payload;
			                               state.chosenChatDetails = chatDetails;
			                               state.chatType = chatType;
			                               state.messages = [];
		                               }, setMessages (state, action) {
			                               state.messages = action.payload;
		                               }, setConversations (state, action) {
			                               state.conversations = action.payload;
		                               }
	                               },
                               });

export const getChosenChatDetails = (state) => state.chats.chosenChatDetails;
export const getMessages = (state) => state.chats.messages;
export const getConversations = (state) => state.chats.conversations;


export const {
	setChosenChatDetails,
	setMessages,
	setConversations
} = chatsSlice.actions;

export default chatsSlice.reducer;
