import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { selectEventById } from '../eventsApiSlice';

const TableRow = ({eventId}) => {
    const event = useSelector((state) => selectEventById(state, eventId));
    return (
        <tr key={event.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {event.title.length > 80
                    ? `${event.title.slice(0, 80)}...`
                    : event.title}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {event.description.length > 50
                    ? `${event.description.slice(0, 50)}...`
                    : event.description}
            </td>

            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                <Link
                    to={`edit/${event.id}`}
                    className='text-blue-600 hover:text-primary-900'
                >
                    <PencilSquareIcon className='w-7'/>
                </Link>
            </td>
        </tr>
    );
};

export default TableRow;
