import { useState } from 'react';
import {
	selectDepartmentById,
	useDeleteDepartmentMutation,
	useUpdateDepartmentMutation,
} from '../departmentsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextInputLong from './../../../components/TextInputLong';
import TextArea from './../../../components/TextArea';
import ConfirmDeletionModal from './../../../components/ConfirmDeletionModal';

export default function EditDepartmentForm () {
	const {departmentId} = useParams();
	const navigate = useNavigate();
	
	const [updateDepartment, {isLoading}] = useUpdateDepartmentMutation();
	const [deleteDepartment] = useDeleteDepartmentMutation();
	
	const department = useSelector((state) =>
		                               selectDepartmentById(state, departmentId),
	);
	
	const [title, setTitle] = useState(department?.title);
	const [description, setDescription] = useState(department?.description);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	
	if (!department) {
		return <h2>Department Not Found</h2>;
	}
	
	const handleTitleInput = (e) => setTitle(e.target.value);
	const handleDescriptionInput = (e) => setDescription(e.target.value);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedDepartment = {
			id: departmentId,
			title,
			description,
		};
		console.log(updatedDepartment);
		try {
			await updateDepartment(updatedDepartment)
				.unwrap();
			setTitle('');
			setDescription('');
			navigate('/admin/departments');
		} catch (err) {
			console.log(err);
		}
	};
	
	const handleDelete = async () => {
		try {
			await deleteDepartment({id: departmentId});
			setTitle('');
			setDescription('');
			setOpenDeleteModal(false);
			navigate('/admin/departments');
		} catch (err) {
			console.log(err);
		}
	};
	
	return (
		<>
			<form
				className="space-y-8 divide-y divide-gray-200"
				onSubmit={handleSubmit}
			>
				<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
					<div className="space-y-6 sm:space-y-5">
						<div>
							<h3 className="text-xl font-semibold leading-6 text-gray-900">
								Edit Department
							</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Please fill all the required fields.
							</p>
						</div>
						<div className="space-y-6 sm:space-y-5">
							<TextInputLong
								name="title"
								label="Title"
								type="text"
								value={title}
								onChange={handleTitleInput}
								required={true}
							/>
							
							<TextArea
								name="description"
								label="Description"
								value={description}
								rows={10}
								onChange={handleDescriptionInput}
								required={true}
							/>
						</div>
					</div>
				</div>
				
				<div className="pt-5">
					<div className="flex justify-end">
						<Link
							type="button"
							to="/admin/departments"
							className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Cancel
						</Link>
						<button
							type="button"
							onClick={() => setOpenDeleteModal(true)}
							className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
						>
							Delete
						</button>
						<button
							type="submit"
							className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Save
						</button>
					</div>
				</div>
			</form>
			<ConfirmDeletionModal
				open={openDeleteModal}
				setOpen={setOpenDeleteModal}
				onDelete={handleDelete}
				title={title}
			/>
		</>
	);
}
