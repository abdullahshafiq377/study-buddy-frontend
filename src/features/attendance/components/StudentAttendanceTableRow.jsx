import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useGetAssignmentsBySectionQuery } from '../../assignments/assignmentApiSlice';
import { useGetLectureBySectionQuery } from '../lecturesApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import { useGetAttendanceByStudentQuery } from '../attendanceApiSlice';


function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const StudentAttendanceTableRow = ({section, instructorData, attendanceData}) => {
	const userId = useSelector(selectCurrentUserId);
	const {isSuccess: lectureIsSuccess, data: lectureData} = useGetLectureBySectionQuery(section.section_id);
	
	let myAttendance = [];
	let myPresents = [];
	let percentage = 0;
	if (lectureIsSuccess) {
		lectureData.ids.map(lectureId => {
			attendanceData.ids.map(attendanceId => {
				if (lectureId === attendanceData.entities[attendanceId].lecture_id) {
					myAttendance.push(Boolean(attendanceData.entities[attendanceId].is_present));
				}
			});
		});
		myPresents = myAttendance.filter(i => {
			return i === true;
		});
		if (myAttendance.length) {
			percentage = (myPresents.length / myAttendance.length) * 100;
		}
	}
	return (
		<tr key={section.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{section.section_id ? section.title : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.section_id ? instructorData.entities[section.instructor_id]?.name : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.section_id ? myPresents.length : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.section_id ? myAttendance.length - myPresents.length : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.section_id ? myAttendance.length : 'N/A'}
			</td>
			
			<td className={classNames(
				'whitespace-nowrap px-3 py-4 text-sm font-medium',
				percentage >= 80 ? 'text-green-600' : 'text-red-600'
			)}>
				{section.section_id ? percentage.toPrecision(3) + ' %' : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{
					section.section_id ?
					<Link
						type="button"
						to={section.section_id}
						className="text-blue-600 hover:text-primary-900"
					>
						<ChevronRightIcon className="w-7"/>
					</Link>
					                   :
					''
				}
			</td>
		</tr>
	);
};

export default StudentAttendanceTableRow;
