import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatISO } from 'date-fns';
import { useDeleteLectureMutation } from '../lecturesApiSlice';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';

const AttendanceHistoryTableRow = ({lecture}) => {
	const [deleteLecture] = useDeleteLectureMutation();
	const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
	const handleDelete = async () => {
		await deleteLecture(lecture.id);
	};
	return (
		<tr key={lecture?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{lecture?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(lecture?.date), {representation: 'date'})}
			
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.start_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{lecture?.end_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					onClick={() => setOpenConfirmDeletionModal(!openConfirmDeletionModal)}
					className="text-red-500 hover:text-red-700"
				>
					<TrashIcon className="w-7"/>
				</button>
			</td>
			
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					to={`/instructor/attendance/mark/${lecture?.id}`}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</Link>
			</td>
			<ConfirmDeletionModal setOpen={setOpenConfirmDeletionModal} open={openConfirmDeletionModal}
			                      onDelete={handleDelete} title={lecture.title}/>
		</tr>
	);
};

export default AttendanceHistoryTableRow;
