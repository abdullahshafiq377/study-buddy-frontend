import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import {
	selectEventById,
	useDeleteEventMutation,
} from '../eventsApiSlice';

const TableRow = ({ eventId }) => {
	const [deleteEvent] = useDeleteEventMutation();

	const event = useSelector((state) =>
		selectEventById(state, eventId),
	);

	const handleDelete = async () => {
		try {
			await deleteEvent({ id: eventId });
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<tr key={event.id}>
			<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
				{event.title}
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				{`${event.description.slice(0, 30)}...`}
			</td>

			<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
				<Link
					to={`/admin/edit-event/${event.id}`}
					className='text-blue-600 hover:text-primary-900'
				>
					<PencilSquareIcon className='w-7' />
				</Link>
			</td>
			<td className='relative whitespace-nowrap py-2 pl-5'>
				<button
					onClick={handleDelete}
					className='text-red-400 hover:text-red-600'
				>
					<TrashIcon className='w-7' />
				</button>
			</td>
		</tr>
	);
};

export default TableRow;
