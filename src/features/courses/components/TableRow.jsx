import React from 'react';
import { useSelector } from 'react-redux';
import { selectCourseById, useDeleteCourseMutation } from '../coursesApiSlice';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const TableRow = ({courseId}) => {
    const [deleteCourse] = useDeleteCourseMutation();

    const course = useSelector((state) => selectCourseById(state, courseId));

    const handleDelete = async () => {
        try {
            await deleteCourse({id: courseId});
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <tr key={course.id}>
            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                {course.course_code}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {course.title}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {course.credit_hours}
            </td>
            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                {`${course.description.slice(0, 30)}...`}
            </td>
            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                <Link
                    to={`edit/${course.id}`}
                    className='text-blue-600 hover:text-primary-900'
                >
                    <PencilSquareIcon className='w-7'/>
                </Link>
            </td>
        </tr>
    );
};

export default TableRow;
