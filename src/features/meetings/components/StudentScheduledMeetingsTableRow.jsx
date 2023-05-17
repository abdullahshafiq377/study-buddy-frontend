import React from 'react';
import {
	useGetSectionsByDepartmentQuery,
	useGetSectionsByInstructorQuery,
	useGetSectionsQuery
} from '../../sections/sectionsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserDepartmentId } from '../../auth/authSlice';
import { formatISO } from 'date-fns';

const StudentScheduledMeetingsTableRow = ({meeting, handleJoin}) => {
	const departmentId = useSelector(selectCurrentUserDepartmentId);
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByDepartmentQuery(departmentId);
	let section = '';
	if (isSuccessSection) {
		section = sectionData.entities[meeting.section_id];
	}
	
	return (
		<tr key={meeting?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{meeting?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section?.instructor_name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{meeting?.start_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(meeting?.start_date), {representation: 'date'})}
			</td>
		</tr>
	);
};

export default StudentScheduledMeetingsTableRow;
