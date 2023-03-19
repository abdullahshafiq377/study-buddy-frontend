import DropdownMenu from '../../../components/DropdownMenu';
import RadioInput from '../../../components/RadioInput';
import TextInput from '../../../components/TextInput';
import {useState} from 'react';
import {useAddNewStudentMutation} from '../studentsApiSlice';
import {Link, useNavigate} from 'react-router-dom';
import TextInputLong from './../../../components/TextInputLong';
import {useDispatch, useSelector} from 'react-redux';
import {departmentsApiSlice, selectAllDepartments,} from './../../departments/departmentsApiSlice';
import {programsApiSlice, selectAllPrograms,} from './../../programs/programsApiSlice';
import ComboBox from "../../../components/ComboBox";

export default function AddStudentForm() {
    const [addNewStudent, {isLoading}] = useAddNewStudentMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [program, setProgram] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [nationality, setNationality] = useState('');
    const [session, setSession] = useState('');
    const [rollNum, setRollNum] = useState('');

    dispatch(departmentsApiSlice.endpoints.getDepartments.initiate());
    dispatch(programsApiSlice.endpoints.getPrograms.initiate());
    const departments = useSelector(selectAllDepartments);
    const programs = useSelector(selectAllPrograms);

    const handleNameInput = (e) => setName(e.target.value);
    const handleFatherNameInput = (e) => setFatherName(e.target.value);
    const handleEmailInput = (e) => setEmail(e.target.value);
    //const handleDepartmentInput = (e) => setDepartmentId(e.target.value);
    const handleProgramInput = (e) => setProgram(e.target.value);
    const handleGenderInput = (e) => setGender(e.target.id);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleNationalityInput = (e) => setNationality(e.target.value);
    const handleSessionInput = (e) => setSession(e.target.value);
    const handleRollNumInput = (e) => setRollNum(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            name,
            f_name: fatherName,
            email,
            gender,
            contact,
            nationality,
            dob: null,
            image: null,
            department_id: department.id,
            session,
            reg_num: rollNum,
            program_id: program.id,
            program_title: program.name,
        };
        console.log(newStudent);

        try {
            // await addNewStudent(newStudent).unwrap();
            // setName('');
            // setFatherName('');
            // setEmail('');
            // setDepartmentId('');
            // setProgram('');
            // setGender('');
            // setContact('');
            // setNationality('');
            // setSession('');
            // setRollNum('');
            // navigate('/sub-admin/students');
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
                            Add Student
                        </h3>
                        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                            Please fill all the required fields.
                        </p>
                    </div>

                    <div className='space-y-6 sm:space-y-5'>
                        <div
                            className='sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                            <label
                                htmlFor='photo'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Photo
                            </label>
                            <div className='mt-1 sm:col-span-2 sm:mt-0'>
                                <div className='flex items-center'>
									<span className='h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
										<svg
                                            className='h-full w-full text-gray-300'
                                            fill='currentColor'
                                            viewBox='0 0 24 24'
                                        >
											<path
                                                d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z'/>
										</svg>
									</span>
                                    <button
                                        type='button'
                                        className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>

                        <TextInput
                            name='full-name'
                            label='Full Name'
                            type='text'
                            onChange={handleNameInput}
                            required={true}
                        />

                        <TextInput
                            name='father-name'
                            label="Father's Name"
                            type='text'
                            onChange={handleFatherNameInput}
                            required={true}
                        />

                        <TextInputLong
                            name='email'
                            label='Email'
                            type='email'
                            onChange={handleEmailInput}
                            required={true}
                        />

                        <ComboBox
                            label='Department'
                        data={departments}
                        selectedData={department}
                        setSelectedData={setDepartment}
                        />

                        <TextInput
                            name='session'
                            label='Session'
                            type='text'
                            onChange={handleSessionInput}
                            required={true}
                        />

                        <ComboBox
                            label='Program'
                            data={programs}
                            selectedData={program}
                            setSelectedData={setProgram}
                        />

                        <TextInput
                            name='rollNumber'
                            label='Roll Number'
                            type='text'
                            onChange={handleRollNumInput}
                            required={true}
                        />

                        <RadioInput
                            name='gender'
                            label='Gender'
                            onChange={handleGenderInput}
                            options={[
                                {name: 'male', label: 'Male'},
                                {name: 'female', label: 'Female'},
                            ]}
                        />

                        <TextInput
                            name='contact'
                            label='Contact'
                            type='text'
                            onChange={handleContactInput}
                            required={true}
                        />

                        <TextInput
                            name='nationality'
                            label='Nationality'
                            onChange={handleNationalityInput}
                            type='text'
                        />
                    </div>
                </div>
            </div>

            <div className='pt-5'>
                <div className='flex justify-end'>
                    <Link
                        type='button'
                        to='/sub-admin/students'
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
