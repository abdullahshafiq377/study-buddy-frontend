import { store } from '../../../app/store';
import { setMessages } from '../chatsApiSlice';

export const updateChatHistoryIfActive = data => {
	const {participants, messages} = data;
	
	const receiverId = store.getState().chats.chosenChatDetails?.id;
	const userId = store.getState().auth.userId;
	
	if (receiverId && userId) {
		const usersInConversation = [userId, receiverId];
		
		updateChatHistoryIfSameConversation({participants, usersInConversation, messages});
	}
};

const updateChatHistoryIfSameConversation = ({participants, usersInConversation, messages}) => {
	const result = participants.every(participantId => {
		return usersInConversation.includes(participantId);
	});
	
	console.log('result', result);
	console.log('messages', messages);
	
	if (result) {
		store.dispatch(setMessages(messages));
	}
};


