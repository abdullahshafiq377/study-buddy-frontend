import React from 'react';
import { getOnlineUsers } from '../usersApiSlice';
import { useSelector } from 'react-redux';

const UserLayout = ({currentChatDetails, user}) => {
	const onlineUsers = useSelector(getOnlineUsers);
	return (
		<div className="relative flex items-center">
		<span className="relative inline-block">
        <img
	        className="h-12 w-12 rounded-full"
	        src={`http://localhost:8000/api/v1/files/${user?.image}`}
	        alt=""
        />
			{onlineUsers.includes(user?.id) ? (
				<span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"/>
			) : (
				 <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-300 ring-2 ring-white"/>
			 )}
			
      </span>
			<span className="block ml-4 text-gray-700">
        {user?.name}
      </span>
		</div>
	);
};

export default UserLayout;
