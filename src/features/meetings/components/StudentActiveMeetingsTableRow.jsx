import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserDepartmentId } from '../../auth/authSlice';
import { useGetSectionsByDepartmentQuery } from '../../sections/sectionsApiSlice';
import { joinMeeting } from '../../../services/RTC/meetingHandler';
import { Link } from 'react-router-dom';

const StudentActiveMeetingsTableRow = ({meeting}) => {
	const departmentId = useSelector(selectCurrentUserDepartmentId);
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByDepartmentQuery(departmentId);
	let section = '';
	if (isSuccessSection) {
		section = sectionData.entities[meeting.section_id];
	}
	console.log(section);
	
	const handleJoin = () => {
		joinMeeting(meeting.id);
	};
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
				<Link
					type="button"
					to="in-meeting"
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:text-sm"
					onClick={handleJoin}
				>
					Join
				</Link>
			</td>
		</tr>
	);
};

export default StudentActiveMeetingsTableRow;
