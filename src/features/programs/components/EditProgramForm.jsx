import {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import DropdownMenu from '../../../components/DropdownMenu';
import {useDispatch, useSelector} from 'react-redux';
import TextArea from './../../../components/TextArea';
import TextInputLong from './../../../components/TextInputLong';
import ConfirmDeletionModal from './../../../components/ConfirmDeletionModal';
import {departmentsApiSlice, selectAllDepartments,} from './../../departments/departmentsApiSlice';
import {selectProgramById, useDeleteProgramMutation, useUpdateProgramMutation,} from '../programsApiSlice';

export default function EditDepartmentForm() {
    const {programId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(departmentsApiSlice.endpoints.getDepartments.initiate());
    const departments = useSelector(selectAllDepartments);

    const [updateProgram, {isLoading}] = useUpdateProgramMutation();
    const [deleteProgram] = useDeleteProgramMutation();

    const program = useSelector((state) => selectProgramById(state, programId));

    const [title, setTitle] = useState(program?.title);
    const [departmentId, setDepartmentId] = useState(program?.department_id);
    const [description, setDescription] = useState(program?.description);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    if (!program) {
        return <h2>Program Not Found</h2>;
    }

    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleDepartmentInput = (e) => setDepartmentId(e.target.value);
    const handleDescriptionInput = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProgram = {
            id: programId,
            title,
            description,
            department_id: departmentId,
        };
        console.log(updatedProgram);
        try {
            await updateProgram(updatedProgram).unwrap();
            setTitle('');
            setDepartmentId('');
            setDescription('');
            navigate('/admin/programs');
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProgram({id: programId});
            setTitle('');
            setDepartmentId('');
            setDescription('');
            setOpenDeleteModal(false);
            navigate('/admin/programs');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit}
            >
                <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div className='space-y-6 sm:space-y-5'>
                        <div>
                            <h3 className='text-xl font-semibold leading-6 text-gray-900'>
                                Edit Program
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
                                value={title}
                                onChange={handleTitleInput}
                                required={true}
                            />

                            <DropdownMenu
                                name='department'
                                label='Department'
                                required={true}
                                value={departmentId}
                                data={departments}
                                onChange={handleDepartmentInput}
                            />

                            <TextArea
                                name='description'
                                label='Description'
                                rows={10}
                                value={description}
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
                            type='button'
                            onClick={() => setOpenDeleteModal(true)}
                            className='ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm'
                        >
                            Delete
                        </button>
                        <button
                            type='submit'
                            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
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
