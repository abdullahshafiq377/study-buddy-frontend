import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../../components/TextInput';

const SubAdminSetting = ({subAdmin}) => {
	const navigate = useNavigate();
	const [name, setName] = useState(subAdmin.name);
	const [fatherName, setFatherName] = useState(subAdmin.f_name);
	const [dob, setDob] = useState(subAdmin?.dob?.split('T')[0]);
	const [email, setEmail] = useState(subAdmin.email);
	const [nationality, setNationality] = useState(subAdmin.nationality);
	const [contact, setContact] = useState(subAdmin.contact);
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [imageUrl, setImageUrl] = useState(`http://localhost:8000/api/v1/files/${subAdmin?.image}`);
	
	const handleNameInput = (e) => setName(e.target.value);
	const handleFatherNameInput = (e) => setFatherName(e.target.value);
	const handleDobInput = (e) => setDob(e.target.value);
	const handleEmailInput = (e) => setEmail(e.target.value);
	const handleNationalityInput = (e) => setNationality(e.target.value);
	const handleContactInput = (e) => setContact(e.target.value);
	const handleOldPassInput = (e) => setOldPass(e.target.value);
	const handleNewPassInput = (e) => setNewPass(e.target.value);
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		//TODO: Implement handleSubmit
		navigate('/sub-admin/dashboard');
	};
	return (
		<div className="divide-y divide-gray-200">
			<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
					<p className="mt-1 text-sm leading-6 text-gray-700">
						Update your personal details associated with your account.
					</p>
				</div>
				
				<form className="md:col-span-2">
					<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
						<div className="col-span-full flex items-center gap-x-8">
							<img
								src={imageUrl}
								alt=""
								className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
							/>
							<div>
								<button
									type="button"
									className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
								>
									Change avatar
								</button>
							</div>
						</div>
						
						<div className="col-span-full">
							<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									value={name}
									onChange={handleNameInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
						
						<div className="col-span-full">
							<label htmlFor="father-name" className="block text-sm font-medium leading-6 text-gray-900">
								Father Name
							</label>
							<div className="mt-2">
								<input
									id="father-name"
									name="father-name"
									type="text"
									value={fatherName}
									onChange={handleFatherNameInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
						
						<div className="col-span-full">
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									value={email}
									onChange={handleEmailInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
						
						<div className="col-span-full">
							<label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
								Date of Birth
							</label>
							<div className="mt-2">
								<input
									id="dob"
									name="dob"
									type="date"
									value={dob}
									onChange={handleDobInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
						
						<div className="col-span-full">
							<label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
								Nationality
							</label>
							<div className="mt-2">
								<input
									id="nationality"
									name="nationality"
									type="text"
									value={nationality}
									onChange={handleNationalityInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
					
					</div>
					
					<div className="mt-8 flex">
						<button
							type="submit"
							className="inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Save
						</button>
					</div>
				</form>
			</div>
			
			<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">Change password</h2>
					<p className="mt-1 text-sm leading-6 text-gray-700">
						Update your password associated with your account.
					</p>
				</div>
				
				<form className="md:col-span-2">
					<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
						<div className="col-span-full">
							<label htmlFor="current-password"
							       className="block text-sm font-medium leading-6 text-gray-900">
								Current password
							</label>
							<div className="mt-2">
								<input
									id="current-password"
									name="current_password"
									type="password"
									autoComplete="current-password"
									value={oldPass}
									onChange={handleOldPassInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
						
						<div className="col-span-full">
							<label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
								New password
							</label>
							<div className="mt-2">
								<input
									id="new-password"
									name="new_password"
									type="password"
									autoComplete="new-password"
									value={newPass}
									onChange={handleNewPassInput}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
								/>
							</div>
						</div>
					</div>
					
					<div className="mt-8 flex">
						<button
							type="submit"
							className="inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubAdminSetting;
