import React from 'react';

const InstructorDashboardTableRow = ({section}) => {
	return (
		<tr key={section.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{section.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.semester}
			</td>
		</tr>
	);
};

export default InstructorDashboardTableRow;
