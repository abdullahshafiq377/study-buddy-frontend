import React from 'react';
import { format, parseISO } from 'date-fns';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const Message = ({message, receiverId}) => {
	const date = format(parseISO(message.date_time), 'yyyy-MM-dd HH:mm:ss');
	return (<>
		<div className={classNames(message.author_id === receiverId ? '' : 'ml-auto justify-end',
		                           'flex w-full mt-2 space-x-3 max-w-xs')}>
			<div>
				<div className={message.author_id === receiverId ? 'bg-gray-300 p-3 rounded-r-lg rounded-bl-lg'
				                                                 : 'bg-primary-700 text-white p-3 rounded-l-lg rounded-br-lg'}>
					<p className="text-sm">{message.content}</p>
				</div>
				<span className="text-xs text-gray-500 leading-none">{date}</span>
			</div>
		</div>
	
	</>);
};

export default Message;
