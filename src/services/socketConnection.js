import io from 'socket.io-client';
import { setOnlineUsers } from '../features/chats/usersApiSlice';
import { useDispatch } from 'react-redux';
import { store } from '../app/store';
import { updateChatHistoryIfActive, updateConversationHistory } from '../features/chats/utils/chats';
import { setConversations } from '../features/chats/chatsApiSlice';

let socket = null;

export const connectWithSocketServer = userDetails => {
	const {accessToken} = userDetails;
	socket = io('http://localhost:8000', {
		auth: {
			accessToken
		}
	});
	
	socket.on('connect', () => {
		console.log('successfully connected to socket.io server');
		console.log(socket.id);
	});
	
	socket.on('online-users', data => {
		const {onlineUsers} = data;
		store.dispatch(setOnlineUsers({onlineUsers}));
		
	});
	socket.on('direct-chat-history', data => {
		updateChatHistoryIfActive(data);
	});
	socket.on('direct-conversation-history', data => {
		const {conversation} = data;
		store.dispatch(setConversations(conversation));
	});
};

export const sendDirectMessage = (data) => {
	socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
	socket.emit('direct-chat-history', data);
};
export const getDirectConversationHistory = () => {
	socket.emit('direct-conversation-history');
};
