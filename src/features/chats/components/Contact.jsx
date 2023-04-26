import React, { useState } from 'react';
import UserLayout from './UserLayout';

const Contact = ({chatRoom, onlineUsersId, currentUser}) => {
	const [contact, setContact] = useState();
	return (
		<UserLayout currentUser={currentUser}/>
	);
};

export default Contact;
