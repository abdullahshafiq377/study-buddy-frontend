import DropdownMenu from '../../../components/DropdownMenu';
import RadioInput from '../../../components/RadioInput';
import TextInput from '../../../components/TextInput';
import { useState } from 'react';
import { useAddNewProgramMutation } from '../programsApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import TextInputLong from './../../../components/TextInputLong';
import TextArea from './../../../components/TextArea';

export default function AddProgramForm() {
	const [addNewProgram, { isLoading }] = useAddNewProgramMutation();

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [fatherName, setFatherName] = useState('');
	const [email, setEmail] = useState('');
	const [program, setProgram] = useState('');
	const [gender, setGender] = useState('');
	const [contact, setContact] = useState('');
	const [nationality, setNationality] = useState('');

	const handleNameInput = (e) => setName(e.target.value);
	const handleFatherNameInput = (e) => setFatherName(e.target.value);
	const handleEmailInput = (e) => setEmail(e.target.value);
	const handleProgramInput = (e) => setProgram(e.target.value);
	const handleGenderInput = (e) => setGender(e.target.id);
	const handleContactInput = (e) => setContact(e.target.value);
	const handleNationalityInput = (e) => setNationality(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newProgram = {
			name,
			f_name: fatherName,
			email,
			gender,
			contact,
			nationality,
			dob: null,
			image: null,
			program_id: null,
		};
		console.log(newProgram);

		try {
			await addNewProgram(newProgram).unwrap();
			setName('');
			setFatherName('');
			setEmail('');
			setProgram('');
			setGender('');
			setContact('');
			setNationality('');
			navigate('/admin/programs');
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
							Add Program
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
							onChange={handleNameInput}
							required={true}
						/>

						<DropdownMenu
							name='department'
							label='Department'
							required={true}
						/>

						<TextArea
							name='description'
							label='Description'
							rows={10}
							onChange={handleContactInput}
							required={true}
						/>
					</div>
				</div>
			</div>

			<div className='pt-5'>
				<div className='flex justify-end'>
					<Link
						type='button'
						to='/admin/programs'
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
