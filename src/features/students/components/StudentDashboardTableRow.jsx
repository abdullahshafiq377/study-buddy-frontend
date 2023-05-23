import React from 'react';

const StudentDashboardTableRow = ({section, instructorData}) => {
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
		</tr>
	);
};

export default StudentDashboardTableRow;
