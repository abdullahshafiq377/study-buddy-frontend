import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { selectNoticeById } from '../noticesApiSlice';

const TableRow = ({noticeId}) => {
    const notice = useSelector((state) => selectNoticeById(state, noticeId));

    return (
        <tr key={notice.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {notice.title.length > 90
                    ? `${notice.title.slice(0, 90)}...`
                    : notice.title}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {notice.link.length > 30
                    ? `${notice.link.slice(0, 30)}...`
                    : notice.link}
            </td>

            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                <Link
                    to={`edit/${notice.id}`}
                    className='text-blue-600 hover:text-primary-900'
                >
                    <PencilSquareIcon className='w-7'/>
                </Link>
            </td>
        </tr>
    );
};

export default TableRow;
