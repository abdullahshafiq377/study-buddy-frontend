import DropdownMenu from '../../../components/DropdownMenu';
import TextInput from '../../../components/TextInput';
import {useState} from 'react';
import {useAddNewCourseMutation} from '../coursesApiSlice';
import {Link, useNavigate} from 'react-router-dom';
import TextArea from './../../../components/TextArea';
import TextInputLong from './../../../components/TextInputLong';
import {useDispatch, useSelector} from 'react-redux';
import {departmentsApiSlice, selectAllDepartments,} from './../../departments/departmentsApiSlice';
import {programsApiSlice, selectAllPrograms,} from './../../programs/programsApiSlice';

export default function AddCourseForm() {
    const [addNewCourse, {isLoading}] = useAddNewCourseMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [courseCode, setCourseCode] = useState('');
    const [title, setTitle] = useState('');
    const [creditHours, setCreditHours] = useState(0);
    const [departmentId, setDepartmentId] = useState('');
    const [programId, setProgramId] = useState('');
    const [description, setDescription] = useState('');

    dispatch(departmentsApiSlice.endpoints.getDepartments.initiate());
    dispatch(programsApiSlice.endpoints.getPrograms.initiate());
    const departments = useSelector(selectAllDepartments);
    const programs = useSelector(selectAllPrograms);

    const handleCourseCodeInput = (e) => setCourseCode(e.target.value);
    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleCreditHoursInput = (e) => setCreditHours(e.target.value);
    const handleDepartmentIdInput = (e) => setDepartmentId(e.target.value);
    const handleProgramIdInput = (e) => setProgramId(e.target.value);
    const handleDescriptionInput = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = {
            title,
            credit_hours: creditHours,
            department_id: departmentId,
            program_id: programId,
            pre_reqs: null,
            min_semester: null,
            offered: 1,
            course_code: courseCode,
            description,
        };
        console.log(newCourse);

        try {
            await addNewCourse(newCourse).unwrap();
            setCourseCode('');
            setTitle('');
            setCreditHours(0);
            setDepartmentId('');
            setProgramId('');
            setDescription('');
            navigate('/sub-admin/courses');
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
                            Add Course
                        </h3>
                        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                            Please fill all the required fields.
                        </p>
                    </div>

                    <div className='space-y-6 sm:space-y-5'>
                        <TextInput
                            name='courseCode'
                            label='Course Code'
                            type='text'
                            onChange={handleCourseCodeInput}
                            required={true}
                        />

                        <TextInputLong
                            name='title'
                            label='Title'
                            type='text'
                            onChange={handleTitleInput}
                            required={true}
                        />

                        <TextInput
                            name='creditHours'
                            label='Credit Hours'
                            type='number'
                            onChange={handleCreditHoursInput}
                            required={true}
                        />

                        <DropdownMenu
                            name='department'
                            label='Department'
                            required={true}
                            data={departments}
                            onChange={handleDepartmentIdInput}
                        />

                        <DropdownMenu
                            name='program'
                            label='Program'
                            required={true}
                            data={programs}
                            onChange={handleProgramIdInput}
                        />

                        <TextArea
                            name='description'
                            label='Description'
                            rows={5}
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
                        to='/sub-admin/courses'
                        className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    >
                        Cancel
                    </Link>
                    <button
                        type='submit'
                        className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
