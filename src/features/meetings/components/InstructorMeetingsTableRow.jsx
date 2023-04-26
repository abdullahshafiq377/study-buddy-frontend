import React from 'react';
import { Link } from 'react-router-dom';

const InstructorMeetingsTableRow = ({meeting, handleRemove, handleJoin}) => {
	return (
		<tr key={meeting?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{meeting?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{meeting?.course}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{meeting?.section}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
					onClick={handleRemove}
				>
					Cancel
				</button>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					to="in-meeting"
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:text-sm"
				
				>
					Join
				</Link>
			</td>
		</tr>
	);
};

export default InstructorMeetingsTableRow;
