import React, { useEffect, useRef } from 'react';
import Message from './Message';
import ChatForm from './ChatForm';
import UserLayout from './UserLayout';
import { useSelector } from 'react-redux';
import { getMessages } from '../chatsApiSlice';
import { selectCurrentUserId } from '../../auth/authSlice';
import { getDirectConversationHistory } from '../../../services/socketConnection';

const ChatRoom = ({currentChatDetails}) => {
	const userId = useSelector(selectCurrentUserId);
	const messages = useSelector(getMessages);
	useEffect(() => {
		getDirectConversationHistory();
	}, [messages]);
	
	// console.log(sortedMessages);
	const scrollMessagesRef = useRef();
	useEffect(() => {
		scrollMessagesRef.current?.scrollIntoView({
			                                          block: 'end',
			                                          behavior: 'smooth',
		                                          });
	}, [messages]);
	
	
	const handleFormSubmit = () => {
	};
	
	return (<div className="lg:col-span-2 lg:block">
		<div className="w-full">
			<div className="p-3 bg-white border-b border-gray-200">
				<UserLayout user={currentChatDetails}/>
			</div>
			
			<div
				className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200">
				<div className="space-y-2">
					<div
						ref={scrollMessagesRef}>
						{messages.map(message => {
							return <Message key={message.id} message={message} receiverId={currentChatDetails.id}/>;
						})}
					
					</div>
				</div>
			</div>
			<ChatForm currentChatDetails={currentChatDetails} handleFormSubmit={handleFormSubmit}/>
		</div>
	</div>);
};

export default ChatRoom;
