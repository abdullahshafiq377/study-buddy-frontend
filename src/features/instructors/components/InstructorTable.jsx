import React from 'react';
import {selectInstructorIds, useGetInstructorsQuery,} from '../instructorsApiSlice';
import {useSelector} from 'react-redux';
import TableRow from './TableRow';
import FeedbackAlert from '../../../components/FeedbackAlert';
import {Link, useNavigate} from 'react-router-dom';

const InstructorsTable = () => {
    const {isLoading, isSuccess, isError, error} = useGetInstructorsQuery();
    const navigate = useNavigate();

    const instructorIds = useSelector(selectInstructorIds);
    console.log(instructorIds);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                <tr>
                    <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                        Name
                    </th>
                    <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                        Email
                    </th>
                    <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                        Gender
                    </th>
                    <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                        Contact
                    </th>
                    <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                        Edit
                    </th>
                    <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                        Delete
                    </th>
                </tr>
                </thead>
                <tbody className='bg-white'>
                {instructorIds.map((id) => {
                    return <TableRow key={id} instructorId={id}/>;
                })}
                </tbody>
            </table>
        );
    } else if (isError) {
        content = (
            <div className='mt-6'>
                <FeedbackAlert type='error' content={error}/>
            </div>
        );
    }

    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Instructors
                    </h1>
                    <p className='mt-2 text-sm text-gray-700'>
                        A list of all the instructors in the system including
                        their name and email.
                    </p>
                </div>
                <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                    <Link
                        to='add'
                        className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto'
                    >
                        Add Instructor
                    </Link>
                </div>
            </div>
            <div className='mt-8 flex flex-col'>
                <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorsTable;
