import React from 'react';
import AttendanceToggleButton from './AttendanceToggleButton';

const MarkAttendanceTableRow = ({student}) => {
	return (
		<tr key={student?.id}>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{student?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{student?.name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<AttendanceToggleButton/>
			</td>
		</tr>
	);
};

export default MarkAttendanceTableRow;
