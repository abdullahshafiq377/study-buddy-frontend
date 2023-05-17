import React from 'react';
import InstructorMeetingsTableRow from './InstructorMeetingsTableRow';
import { selectScheduledMeetings } from '../meetingsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';

const InstructorMeetingsTable = () => {
	const userId = useSelector(selectCurrentUserId);
	const scheduledMeetings = useSelector(selectScheduledMeetings);
	console.log(scheduledMeetings);
	let myScheuledMeetings = [];
	scheduledMeetings.map(meeting => {
		if (meeting.creator_id === userId) {
			myScheuledMeetings.push(meeting);
		}
	});
	return (
		<>
			{myScheuledMeetings.length ?
			 (<>
					 <table className="min-w-full divide-y divide-gray-300">
						 <thead className="bg-gray-50">
						 <tr>
							 <th
								 scope="col"
								 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							 >
								 Title
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Course
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Section
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Time
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Date
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Cancel
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Start
							 </th>
						 </tr>
						 </thead>
						 <tbody className="bg-white">
						 {myScheuledMeetings.map(meeting => {
							 return <InstructorMeetingsTableRow meeting={meeting}/>;
						 })}
						 
						 </tbody>
					 </table>
				 </>
			 )
			                           :
			 (<p className="py-4 pl-4 pr-3 text-sm font-medium text-red-600">No Scheduled Meetings</p>)}
		</>
	);
};

export default InstructorMeetingsTable;
