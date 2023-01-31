import React from 'react';
import {useSelector} from 'react-redux';
import {selectInstructorById, useDeleteInstructorMutation,} from '../instructorsApiSlice';
import {Link} from 'react-router-dom';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';

const TableRow = ({instructorId}) => {
    const [deleteInstructor] = useDeleteInstructorMutation();

    const instructor = useSelector((state) =>
        selectInstructorById(state, instructorId),
    );

    const handleDelete = async () => {
        try {
            await deleteInstructor({id: instructorId});
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <tr key={instructor.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {instructor.name}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {instructor.email}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {instructor.gender.charAt(0).toUpperCase() +
                    instructor.gender.slice(1)}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {instructor.contact}
            </td>
            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                <Link
                    to={`edit/${instructor.id}`}
                    className='text-blue-600 hover:text-primary-900'
                >
                    <PencilSquareIcon className='w-7'/>
                </Link>
            </td>
            <td className='relative whitespace-nowrap py-2 pl-5'>
                <button
                    onClick={handleDelete}
                    className='text-red-400 hover:text-red-600'
                >
                    <TrashIcon className='w-7'/>
                </button>
            </td>
        </tr>
    );
};

export default TableRow;
