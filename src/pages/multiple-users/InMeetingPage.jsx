import React from 'react';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const InMeetingPage = () => {
	const userId = useSelector(selectCurrentUserId);
	return (
		<div className="overflow-hidden bg-white shadow sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg font-medium leading-6 text-gray-900">
					Meeting Title
				</h3>
			</div>
			{/**/}
		</div>
	);
};

export default InMeetingPage;
