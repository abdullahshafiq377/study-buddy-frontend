import React from 'react';

const StudentLearningResourceTableRow = ({learningResource}) => {
	return (
		<tr key={learningResource?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{learningResource?.title}
			</td>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				<a
					href={`http://localhost:8000/api/v1/files/${learningResource?.file_path}`}
					download={learningResource.file_name}
					className="block text-sm font-medium leading-6 text-blue-600"
				>
					{learningResource?.file_name}
				</a>
			</td>
		</tr>
	);
};

export default StudentLearningResourceTableRow;
