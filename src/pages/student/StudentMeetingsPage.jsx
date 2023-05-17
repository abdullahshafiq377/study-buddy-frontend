import React from 'react';
import StudentScheduledMeetingsTable from '../../features/meetings/components/StudentScheduledMeetingsTable';
import StudentActiveMeetingsTable from '../../features/meetings/components/StudentActiveMeetingsTable';
import { getActiveMeetings, getScheduledMeetingHistory } from '../../services/RTC/socketConnection';
import { useSelector } from 'react-redux';
import { useGetRegisteredCoursesQuery } from '../../features/registration/registrationApiSlice';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const StudentMeetingsPage = () => {
	getScheduledMeetingHistory();
	getActiveMeetings();
	
	const userId = useSelector(selectCurrentUserId);
	const {data: registrationData, isSuccess: registrationIsSuccess} = useGetRegisteredCoursesQuery(userId);
	let sectionIds = [];
	if (registrationIsSuccess) {
		const {ids, entities} = registrationData;
		ids.map(id => {
			if (entities[id].section_id !== null) {
				sectionIds.push(entities[id].section_id);
			}
		});
		console.log(sectionIds);
	}
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-bold text-gray-900">
						Meetings
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the sub admins in the system including
						their names, emails, genders and contact numbers.
					</p>
				</div>
			</div>
			
			<div>
				<h3 className="text-l font-bold leading-6 text-gray-900 mt-8">
					Active Meetings
				</h3>
				<StudentActiveMeetingsTable sectionIds={sectionIds}/>
			</div>
			<div>
				<h3 className="text-l font-bold leading-6 text-gray-900 mt-8">
					Scheduled Meetings
				</h3>
				<StudentScheduledMeetingsTable sectionIds={sectionIds}/>
			</div>
		
		</div>
	);
};

export default StudentMeetingsPage;
