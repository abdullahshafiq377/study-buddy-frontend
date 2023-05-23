import React from 'react';
import { formatISO } from 'date-fns';
import { useGetAttendanceByLectureQuery } from '../attendanceApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';


function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const StudentLecturesTableRow = ({lecture}) => {
	const userId = useSelector(selectCurrentUserId);
	const {isSuccess, data} = useGetAttendanceByLectureQuery(lecture.id);
	let isPresent = false;
	
	if (isSuccess) {
		data.ids.map(id => {
			if (data.entities[id].student_id === userId) {
				isPresent = Boolean(data.entities[id].is_present);
			}
		});
		console.log(isPresent);
	}
	return (
		<tr key={lecture?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{lecture?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(lecture?.date), {representation: 'date'})}
			
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.start_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.end_time.slice(0, 5)}
			</td>
			
			<td className={classNames(
				'whitespace-nowrap px-3 py-4 text-sm font-medium',
				isPresent ? 'text-green-600' : 'text-red-600'
			)}>
				{isPresent ? 'Present' : 'Absent'}
			</td>
		</tr>
	);
};

export default StudentLecturesTableRow;
