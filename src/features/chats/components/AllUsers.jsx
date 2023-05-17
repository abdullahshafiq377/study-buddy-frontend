import React from 'react';
import UserLayout from './UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations, setChosenChatDetails } from '../chatsApiSlice';
import { selectCurrentUserId } from '../../auth/authSlice';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const AllUsers = ({currentChatDetails, users}) => {
	const dispatch = useDispatch();
	const currentUserId = useSelector(selectCurrentUserId);
	
	
	const conversationHistory = useSelector(getConversations);
	console.log(conversationHistory);
	
	return (
		<>
			<ul className="overflow-auto h-[30rem]">
				<h2 className="m-4 text-sm font-semibold text-gray-500">Recent chat</h2>
				{users?.map((user) => {
					return conversationHistory?.map((conversation) => {
						if ((user.id === conversation.sender_id || user.id === conversation.receiver_id) && user.id !== currentUserId) {
							return (
								<li>
									<div
										key={user?.id}
										className={
											classNames(currentChatDetails?.id === user?.id
											           ? 'bg-gray-200'
											           : 'transition duration-150 ease-in-out bg-white hover:bg-gray-50 cursor-pointer',
											           'flex items-center px-3 py-2 text-sm border-b'
											)
										}
										onClick={() => dispatch(
											setChosenChatDetails({
												                     chatDetails: {
													                     id: user?.id, name: user?.name,
													                     image: user?.image
												                     },
												                     chatType: 'direct'
											                     }))}
									>
										<UserLayout user={user} currentChatDetails={currentChatDetails}/>
									</div>
								</li>
							);
						}
					});
				})}
			
			</ul>
		</>
	);
};

export default AllUsers;
