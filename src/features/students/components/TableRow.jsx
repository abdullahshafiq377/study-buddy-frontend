import React from 'react';
import { useSelector } from 'react-redux';
import { selectStudentById, useDeleteStudentMutation, } from '../studentsApiSlice';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const TableRow = ({studentId}) => {
    const [deleteStudent] = useDeleteStudentMutation();

    const student = useSelector((state) => selectStudentById(state, studentId));

    const handleDelete = async () => {
        try {
            await deleteStudent({id: studentId});
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <tr key={student.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {`${student.session}-${student.program_title}-${student.reg_num}`}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {student.name}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {student.email}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {student.gender.charAt(0).toUpperCase() +
                    student.gender.slice(1)}
            </td>

            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                <Link
                    to={`edit/${student.id}`}
                    className='text-blue-600 hover:text-primary-900'
                >
                    <PencilSquareIcon className='w-7'/>
                </Link>
            </td>
        </tr>
    );
};

export default TableRow;
