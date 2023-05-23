import React, { useState } from 'react';
import AttendanceToggleButton from './AttendanceToggleButton';
import { useMarkAttendanceMutation } from '../attendanceApiSlice';

const MarkAttendanceTableRow = ({attendance}) => {
	const [enabled, setEnabled] = useState(Boolean(attendance?.is_present));
	const [markAttendance] = useMarkAttendanceMutation();
	console.log('before', enabled);
	
	const handleAttendanceButton = async () => {
		setEnabled(!enabled);
		console.log('after', enabled);
		await markAttendance({attendanceId: attendance.id, isPresent: !enabled});
	};
	return (
		<tr key={attendance?.id}>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{attendance?.student_name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{attendance.session}-{attendance.program_title}-{attendance.reg_num}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<AttendanceToggleButton enabled={enabled} setEnabled={handleAttendanceButton}/>
			</td>
		</tr>
	);
};

export default MarkAttendanceTableRow;
