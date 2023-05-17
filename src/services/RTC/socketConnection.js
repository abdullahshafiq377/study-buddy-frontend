import io from 'socket.io-client';
import { setOnlineUsers } from '../../features/chats/usersApiSlice';
import { store } from '../../app/store';
import { updateChatHistoryIfActive } from '../../features/chats/utils/chats';
import { setConversations } from '../../features/chats/chatsApiSlice';
import { newMeetingCreated, updateActiveMeetings, updateScheduledMeetings } from './meetingHandler';
import { setScheduledMeetings } from '../../features/meetings/meetingsApiSlice';
import * as webRTCHandler from './webRTCHandler';

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
	
	socket.on('scheduled-meetings', data => {
		updateScheduledMeetings(data);
	});
	socket.on('scheduled-meeting-history', data => {
		const {scheduledMeetings} = data;
		store.dispatch(setScheduledMeetings(scheduledMeetings));
	});
	socket.on('start-meeting', data => {
		newMeetingCreated(data);
	});
	socket.on('active-meetings', data => {
		updateActiveMeetings(data);
	});
	socket.on('connection-prepare', data => {
		console.log('connection prepare', data);
		const {connUserSocketId} = data;
		webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
		socket.emit('connection-init', {connUserSocketId});
	});
	
	socket.on('connection-init', data => {
		const {connUserSocketId} = data;
		webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
	});
	
	socket.on('connection-signal', data => {
		webRTCHandler.handleSignalingData(data);
	});
	
	socket.on('meeting-participant-left', data => {
		console.log('user left meeting');
		webRTCHandler.handleParticipantLeftMeeting(data);
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
export const startMeeting = (data) => {
	socket.emit('start-meeting', data);
};
export const scheduleMeeting = (data) => {
	socket.emit('schedule-meeting', data);
};
export const getScheduledMeetingHistory = () => {
	socket.emit('scheduled-meeting-history');
};
export const deleteScheduledMeeting = (data) => {
	socket.emit('delete-scheduled-meeting', data);
};
export const getActiveMeetings = () => {
	socket.emit('get-active-meetings');
};
export const joinMeeting = (data) => {
	socket.emit('join-meeting', data);
};

export const leaveMeeting = (data) => {
	socket.emit('leave-meeting', data);
};

export const signalPeerData = (data) => {
	socket.emit('connection-signal', data);
};

