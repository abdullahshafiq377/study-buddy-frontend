import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import EditQuizSlideOver from './EditQuizSlideOver';
import { formatISO } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const QuizzesTableRow = ({quiz}) => {
	const [openEditQuizSlideOver, setOpenEditQuizSlideOver] = useState(false);
	return (
		<tr key={quiz?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{quiz?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{quiz?.start_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(quiz?.start_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{quiz?.end_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(quiz?.end_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					onClick={() => setOpenEditQuizSlideOver(!openEditQuizSlideOver)}
					className="text-blue-600 hover:text-primary-900"
				>
					<PencilSquareIcon className="w-7"/>
				</button>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					type="button"
					to={`/instructor/quiz/${quiz.id}`}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</Link>
			</td>
			<EditQuizSlideOver open={openEditQuizSlideOver} setOpen={setOpenEditQuizSlideOver}
			                   quiz={quiz}/>
		</tr>
	);
};

export default QuizzesTableRow;
