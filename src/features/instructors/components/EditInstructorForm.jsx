import RadioInput from '../../../components/RadioInput';
import TextInput from '../../../components/TextInput';
import { useRef, useState } from 'react';
import {
	selectInstructorById,
	useDeleteInstructorMutation,
	useUpdateInstructorMutation,
} from '../instructorsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDepartmentsQuery, } from './../../departments/departmentsApiSlice';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';
import ComboBox from '../../../components/ComboBox';

export default function EditInstructorForm () {
	const {instructorId} = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const {data: departmentData, isSuccess: isSuccessDepartments} = useGetDepartmentsQuery();
	let departments;
	if (isSuccessDepartments) {
		let {ids, entities} = departmentData;
		departments = ids.map(id => entities[id]);
	}
	
	const [updateInstructor, {isLoading}] = useUpdateInstructorMutation();
	const [deleteInstructor] = useDeleteInstructorMutation();
	
	const instructor = useSelector((state) =>
		                               selectInstructorById(state, instructorId),
	);
	
	const imageInputRef = useRef(null);
	
	
	const [name, setName] = useState(instructor?.name);
	const [fatherName, setFatherName] = useState(instructor?.f_name);
	const [dob, setDob] = useState(instructor?.dob.split('T')[0]);
	const [email, setEmail] = useState(instructor?.email);
	const [department, setDepartment] = useState(
		{id: instructor?.department_id, name: departmentData?.entities[instructor?.department_id]?.title});
	const [gender, setGender] = useState(instructor?.gender);
	const [contact, setContact] = useState(instructor?.contact);
	const [nationality, setNationality] = useState(instructor?.nationality);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(`http://localhost:8000/api/v1/files/${instructor?.image}`);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	
	if (!instructor) {
		return <h2>Instructor Not Found</h2>;
	}
	
	const handleNameInput = (e) => setName(e.target.value);
	const handleFatherNameInput = (e) => setFatherName(e.target.value);
	const handleDobInput = (e) => setDob(e.target.value);
	
	const handleEmailInput = (e) => setEmail(e.target.value);
	const handleGenderInput = (e) => setGender(e.target.id);
	const handleContactInput = (e) => setContact(e.target.value);
	const handleNationalityInput = (e) => setNationality(e.target.value);
	
	const handleImageInput = () => {
		imageInputRef.current.click();
	};
	
	const handleFileChange = e => {
		const fileObj = e.target.files && e.target.files[0];
		if (!fileObj) {
			return null;
		}
		e.target.value = null;
		setImage(fileObj);
		setImageUrl(URL.createObjectURL(fileObj));
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		let formData = new FormData();
		formData.append('id', instructorId);
		formData.append('name', name);
		image ? formData.append('image', image, image?.name) : formData.append('image', null);
		formData.append('f_name', fatherName);
		formData.append('email', email);
		formData.append('gender', gender);
		formData.append('contact', contact);
		formData.append('nationality', nationality);
		formData.append('dob', dob);
		formData.append('department_id', department.id);
		try {
			await updateInstructor(formData)
				.unwrap();
			setName('');
			setFatherName('');
			setEmail('');
			setDepartment(null);
			setGender('');
			setContact('');
			setNationality('');
			setDob(null);
			setImage(null);
			setImageUrl(null);
			navigate('/sub-admin/instructors');
		} catch (err) {
			console.log(err);
		}
	};
	
	const handleDelete = async () => {
		try {
			await deleteInstructor({id: instructorId});
			setName('');
			setFatherName('');
			setEmail('');
			setDepartment(null);
			setGender('');
			setContact('');
			setNationality('');
			setDob(null);
			setImage(null);
			setImageUrl(null);
			setOpenDeleteModal(false);
			navigate('/sub-admin/instructors');
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
								Edit Instructor
							</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Please fill all the required fields.
							</p>
						</div>
						<div className="space-y-6 sm:space-y-5">
							<div
								className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="photo"
									className="block text-sm font-medium text-gray-700"
								>
									Photo
								</label>
								<div className="mt-1 sm:col-span-2 sm:mt-0">
									<div className="flex items-center">
										<img src={imageUrl} alt="profile image"
										     className="h-12 w-12 overflow-hidden rounded-full bg-gray-100"/>
										<input
											style={{display: 'none'}}
											ref={imageInputRef}
											type="file"
											accept="image/*"
											onChange={handleFileChange}
										/>
										<button
											type="button"
											onClick={handleImageInput}
											className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
										>
											Change
										</button>
									</div>
								</div>
							</div>
							
							<TextInput
								name="full-name"
								label="Full Name"
								type="text"
								value={name}
								onChange={handleNameInput}
								required={true}
							/>
							
							<TextInput
								name="father-name"
								label="Father's Name"
								type="text"
								value={fatherName}
								onChange={handleFatherNameInput}
								required={true}
							/>
							
							<TextInput
								name="dob"
								label="Date of Birth"
								type="date"
								value={dob}
								onChange={handleDobInput}
								required={true}
							/>
							
							<TextInput
								name="email"
								label="Email"
								type="email"
								value={email}
								onChange={handleEmailInput}
								required={true}
							/>
							
							<ComboBox
								label="Department"
								data={departments}
								selectedData={department}
								setSelectedData={setDepartment}
							/>
							
							<RadioInput
								name="gender"
								label="Gender"
								value={gender}
								onChange={handleGenderInput}
								options={[
									{name: 'male', label: 'Male'},
									{name: 'female', label: 'Female'},
								]}
							/>
							
							<TextInput
								name="contact"
								label="Contact"
								type="text"
								value={contact}
								onChange={handleContactInput}
								required={true}
							/>
							
							<TextInput
								name="nationality"
								label="Nationality"
								value={nationality}
								onChange={handleNationalityInput}
								type="text"
							/>
						</div>
					</div>
				</div>
				
				<div className="pt-5">
					<div className="flex justify-end">
						<Link
							type="button"
							to="/sub-admin/instructors"
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
				title={name}
			/>
		</>
	);
}
