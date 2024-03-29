import DropdownMenu from '../../../components/DropdownMenu';
import { useState } from 'react';
import { useAddNewProgramMutation } from '../programsApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import TextInputLong from './../../../components/TextInputLong';
import TextArea from './../../../components/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { departmentsApiSlice, selectAllDepartments, } from './../../departments/departmentsApiSlice';

export default function AddProgramForm() {
    const [addNewProgram, {isLoading}] = useAddNewProgramMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [description, setDescription] = useState('');

    dispatch(departmentsApiSlice.endpoints.getDepartments.initiate());
    const departments = useSelector(selectAllDepartments);

    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleDepartmentInput = (e) => setDepartmentId(e.target.value);
    const handleDescriptionInput = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProgram = {
            title,
            description,
            department_id: departmentId,
        };
        console.log(newProgram);

        try {
            await addNewProgram(newProgram).unwrap();
            setTitle('');
            setDepartmentId('');
            setDescription('');
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
                            onChange={handleTitleInput}
                            required={true}
                        />

                        <DropdownMenu
                            name='department'
                            label='Department'
                            required={true}
                            data={departments}
                            onChange={handleDepartmentInput}
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
