import React from 'react';

const StudentGradesTableRow = ({title, total, obtained}) => {
	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
				{title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{total}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{obtained}
			</td>
		
		</tr>
	);
};

export default StudentGradesTableRow;
