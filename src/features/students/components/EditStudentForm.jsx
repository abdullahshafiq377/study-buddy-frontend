import RadioInput from '../../../components/RadioInput';
import TextInput from '../../../components/TextInput';
import { useRef, useState } from 'react';
import { selectStudentById, useDeleteStudentMutation, useUpdateStudentMutation, } from '../studentsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDepartmentsQuery, } from './../../departments/departmentsApiSlice';
import { useGetProgramsQuery, } from '../../programs/programsApiSlice';
import TextInputLong from './../../../components/TextInputLong';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';
import ComboBox from '../../../components/ComboBox';

export default function EditStudentForm () {
	const {studentId} = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const {data: departmentData, isSuccess: isSuccessDepartments} = useGetDepartmentsQuery();
	const {data: programData, isSuccess: isSuccessPrograms} = useGetProgramsQuery();
	let departments, programs;
	if (isSuccessDepartments) {
		let {ids, entities} = departmentData;
		departments = ids.map(id => entities[id]);
	}
	if (isSuccessPrograms) {
		let {ids, entities} = programData;
		programs = ids.map(id => entities[id]);
	}
	
	const [updateStudent, {isLoading}] = useUpdateStudentMutation();
	const [deleteStudent] = useDeleteStudentMutation();
	
	const student = useSelector((state) => selectStudentById(state, studentId));
	
	const imageInputRef = useRef(null);
	
	const [name, setName] = useState(student?.name);
	const [fatherName, setFatherName] = useState(student?.f_name);
	const [dob, setDob] = useState(student?.dob.split('T')[0]);
	const [email, setEmail] = useState(student?.email);
	const [department, setDepartment] = useState(
		{id: student?.department_id, name: departmentData?.entities[student?.department_id]?.title});
	const [program, setProgram] = useState(
		{id: student?.program_id, name: programData?.entities[student?.program_id]?.title});
	const [gender, setGender] = useState(student?.gender);
	const [contact, setContact] = useState(student?.contact);
	const [nationality, setNationality] = useState(student?.nationality);
	const [session, setSession] = useState(student?.session);
	const [rollNum, setRollNum] = useState(student?.reg_num);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(`http://localhost:8000/api/v1/files/${student?.image}`);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	
	if (!student) {
		return <h2>Student Not Found</h2>;
	}
	
	const handleNameInput = (e) => setName(e.target.value);
	const handleFatherNameInput = (e) => setFatherName(e.target.value);
	const handleDobInput = (e) => setDob(e.target.value);
	const handleEmailInput = (e) => setEmail(e.target.value);
	const handleGenderInput = (e) => setGender(e.target.id);
	const handleContactInput = (e) => setContact(e.target.value);
	const handleNationalityInput = (e) => setNationality(e.target.value);
	const handleSessionInput = (e) => setSession(e.target.value);
	const handleRollNumInput = (e) => setRollNum(e.target.value);
	
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
		formData.append('id', studentId);
		formData.append('name', name);
		image ? formData.append('image', image, image?.name) : formData.append('image', null);
		formData.append('f_name', fatherName);
		formData.append('email', email);
		formData.append('gender', gender);
		formData.append('contact', contact);
		formData.append('nationality', nationality);
		formData.append('dob', dob);
		formData.append('department_id', department.id);
		formData.append('session', session);
		formData.append('reg_num', rollNum);
		formData.append('program_id', program.id);
		formData.append('program_title', program.name);
		try {
			await updateStudent(formData)
				.unwrap();
			setName('');
			setFatherName('');
			setEmail('');
			setDepartment(null);
			setProgram(null);
			setGender('');
			setContact('');
			setNationality('');
			setSession('');
			setRollNum('');
			setDob(null);
			setImage(null);
			setImageUrl(null);
			navigate('/sub-admin/students');
		} catch (err) {
			console.log(err);
		}
	};
	
	const handleDelete = async () => {
		try {
			await deleteStudent({id: studentId});
			setName('');
			setFatherName('');
			setEmail('');
			setDepartment(null);
			setProgram(null);
			setGender('');
			setContact('');
			setNationality('');
			setSession('');
			setRollNum('');
			setDob(null);
			setImage(null);
			setImageUrl(null);
			navigate('/sub-admin/students');
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
								Edit Student
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
							
							<TextInputLong
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
							
							<TextInput
								name="session"
								label="Session"
								type="text"
								value={session}
								onChange={handleSessionInput}
								required={true}
							/>
							
							<ComboBox
								label="Program"
								data={programs}
								selectedData={program}
								setSelectedData={setProgram}
							/>
							
							<TextInput
								name="rollNumber"
								label="Roll Number"
								type="text"
								value={rollNum}
								onChange={handleRollNumInput}
								required={true}
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
							to="/sub-admin/students"
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
