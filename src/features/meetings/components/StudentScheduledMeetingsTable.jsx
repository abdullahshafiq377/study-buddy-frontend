import React from 'react';
import StudentScheduledMeetingsTableRow from './StudentScheduledMeetingsTableRow';
import { useSelector } from 'react-redux';
import { selectScheduledMeetings } from '../meetingsApiSlice';

const StudentScheduledMeetingsTable = ({sectionIds}) => {
	const scheduledMeetings = useSelector(selectScheduledMeetings);
	const myScheduledMeetings = [];
	scheduledMeetings.map(meeting => {
		sectionIds.map(sectionId => {
			if (sectionId === meeting.section_id) {
				myScheduledMeetings.push(meeting);
			}
		});
	});
	console.log(myScheduledMeetings);
	return (
		<div className="mt-4 flex flex-col">
			<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						{myScheduledMeetings?.length ?
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
											 Instructor
										 </th>
										 <th
											 scope="col"
											 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										 >
											 Start Time
										 </th>
										 <th
											 scope="col"
											 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										 >
											 Date
										 </th>
									 </tr>
									 </thead>
									 <tbody className="bg-white">
									 {myScheduledMeetings.map(meeting => {
										 return <StudentScheduledMeetingsTableRow meeting={meeting}/>;
									 })}
									 </tbody>
								 </table>
							 </>
						 )
						                             :
						 (<p className="py-4 pl-4 pr-3 text-sm font-medium text-red-600">No Scheduled Meetings</p>)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentScheduledMeetingsTable;
