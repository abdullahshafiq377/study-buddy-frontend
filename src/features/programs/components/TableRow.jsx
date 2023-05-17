import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { selectProgramById, } from '../programsApiSlice';

const TableRow = ({programId}) => {
    const program = useSelector((state) => selectProgramById(state, programId));

    return (
        <tr key={program.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {program.title}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {program.description.length > 120
                    ? `${program.description.slice(0, 120)}...`
                    : program.description}
            </td>

            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                <Link
                    to={`edit/${program.id}`}
                    className='text-blue-600 hover:text-primary-900'
                >
                    <PencilSquareIcon className='w-7'/>
                </Link>
            </td>
        </tr>
    );
};

export default TableRow;
