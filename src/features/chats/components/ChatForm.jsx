import React, { useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { sendDirectMessage } from '../../../services/RTC/socketConnection';

const ChatForm = ({currentChatDetails}) => {
	const [message, setMessage] = useState('');
	const scrollRef = useRef();
	
	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (message.length > 0) {
			sendDirectMessage({receiverId: currentChatDetails.id, content: message});
		}
		setMessage('');
	};
	return (<div ref={scrollRef}>
		<form onSubmit={handleFormSubmit}>
			<div
				className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200">
				<div className="flex items-center justify-start w-full pr-3 bg-white">
					<input
						type="text"
						placeholder="Write a message"
						className="block w-full max-w-2xl rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
						name="message"
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type="button" className="ml-4" onClick={null}>
						<PaperClipIcon
							className="h-6 w-6 text-primary-900"
							aria-hidden="true"
						/>
					</button>
				</div>
				<button type="submit">
					<PaperAirplaneIcon
						className="h-6 w-6 text-primary-900"
						aria-hidden="true"
					/>
				</button>
			</div>
		</form>
	</div>);
};

export default ChatForm;
