import DropdownMenu from '../../../components/DropdownMenu';
import RadioInput from '../../../components/RadioInput';
import TextInput from '../../../components/TextInput';
import { useState } from 'react';
import { useAddNewDepartmentMutation } from '../departmentsApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import TextInputLong from './../../../components/TextInputLong';
import TextArea from './../../../components/TextArea';

export default function AddDepartmentForm() {
	const [addNewDepartment, { isLoading }] = useAddNewDepartmentMutation();

	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleTitleInput = (e) => setTitle(e.target.value);
	const handleDescriptionInput = (e) => setDescription(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newDepartment = {
			title,
			description,
		};
		console.log(newDepartment);

		try {
			await addNewDepartment(newDepartment).unwrap();
			setTitle('');
			setDescription('');
			navigate('/admin/departments');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			className='space-y-8 divide-y divide-gray-200'
			onSubmit={handleSubmit}
		>
			<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
				<div className='space-y-6 sm:space-y-5'>
					<div>
						<h3 className='text-xl font-semibold leading-6 text-gray-900'>
							Add Department
						</h3>
						<p className='mt-1 max-w-2xl text-sm text-gray-500'>
							Please fill all the required fields.
						</p>
					</div>

					<div className='space-y-6 sm:space-y-5'>
						<TextInputLong
							name='title'
							label='Title'
							type='text'
							onChange={handleTitleInput}
							required={true}
						/>

						<TextArea
							name='description'
							label='Description'
							rows={10}
							onChange={handleDescriptionInput}
							required={true}
						/>
					</div>
				</div>
			</div>

			<div className='pt-5'>
				<div className='flex justify-end'>
					<Link
						type='button'
						to='/admin/departments'
						className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
					>
						Cancel
					</Link>
					<button
						type='submit'
						className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
