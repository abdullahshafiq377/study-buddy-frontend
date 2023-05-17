import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import EditAssignmentSlideOver from './EditAssignmentSlideOver';
import { formatISO } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const AssignmentsTableRow = ({assignment}) => {
	const [openEditAssignmentSlideOver, setOpenEditAssignmentSlideOver] = useState(false);
	return (
		<tr key={assignment?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{assignment?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{assignment?.start_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(assignment?.start_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{assignment?.end_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(assignment?.end_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					onClick={() => setOpenEditAssignmentSlideOver(!openEditAssignmentSlideOver)}
					className="text-blue-600 hover:text-primary-900"
				>
					<PencilSquareIcon className="w-7"/>
				</button>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					type="button"
					to={`/instructor/assignment/${assignment.id}`}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</Link>
			</td>
			<EditAssignmentSlideOver open={openEditAssignmentSlideOver} setOpen={setOpenEditAssignmentSlideOver}
			                         assignment={assignment}/>
		</tr>
	);
};

export default AssignmentsTableRow;
