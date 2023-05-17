import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const AttendanceHistoryTableRow = ({lecture}) => {
	return (
		<tr key={lecture?.id}>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.semester}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					to={`/instructor/attendance/edit/${lecture?.id}`}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</Link>
			</td>
		</tr>
	);
};

export default AttendanceHistoryTableRow;
