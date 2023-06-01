import React from 'react';

const InstructorStudentGradesTableRow = ({
	                                         grade, setTotalMarks, totalMarks, assessmentMarks, setAssessmentMarks,
	                                         onChange
                                         }) => {
	return (
		<tr key={grade?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{grade?.student_name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{grade?.session}-{grade?.program_title}-{grade?.reg_num}
			</td>
			<td className="whitespace-nowrap px-3 py-4">
				<input
					type="number"
					max={totalMarks}
					min={0}
					name={grade.id}
					required={true}
					onChange={(e) => onChange(e)}
					className="block rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600  sm:text-sm"
				/>
			</td>
		</tr>
	);
};

export default InstructorStudentGradesTableRow;
