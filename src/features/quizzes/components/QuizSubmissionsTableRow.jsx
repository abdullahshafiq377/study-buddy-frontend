import React from 'react';
import { formatISO } from 'date-fns';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import EditQuizSlideOver from './EditQuizSlideOver';

const QuizSubmissionsTableRow = ({submission}) => {
	return (
		<tr key={submission?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{submission?.student_name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{submission?.session}-{submission?.program_title}-{submission?.reg_num}
			</td>
			<td className="whitespace-nowrap px-3 py-4">
				<a
					href={`http://localhost:8000/api/v1/files/${submission?.file_path}`}
					download={submission.file_name}
					className="block text-sm font-medium leading-6 text-blue-600"
				>
					{submission.file_name}
				</a>
			</td>
		</tr>
	);
};

export default QuizSubmissionsTableRow;
