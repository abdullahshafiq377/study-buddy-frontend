import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteLearningResourceMutation } from '../learningResourcesApiSlice';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';

const InstructorLearningResourceTableRow = ({learningResource}) => {
	const [deleteLearningResource] = useDeleteLearningResourceMutation();
	const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
	
	const handleDelete = async () => {
		await deleteLearningResource(learningResource.id)
			.unwrap();
	};
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
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					onClick={() => setOpenConfirmDeletionModal(!openConfirmDeletionModal)}
					className="text-red-500 hover:text-red-700"
				>
					<TrashIcon className="w-7"/>
				</button>
			</td>
			<ConfirmDeletionModal setOpen={setOpenConfirmDeletionModal} open={openConfirmDeletionModal}
			                      onDelete={handleDelete} title={learningResource.title}/>
		</tr>
	);
};

export default InstructorLearningResourceTableRow;
