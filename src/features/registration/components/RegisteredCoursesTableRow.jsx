import React from 'react';

const UnregisteredCoursesTableRow = () => {
    const course = {
        id: '123', course_code: 'abc123', title: 'test', credit_hours: '3',
    }
    return (<tr key={course.id}>
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
                <button
                    type='button'
                    className='ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm'
                >
                    Unregister
                </button>
            </td>
        </tr>


    );
};

export default UnregisteredCoursesTableRow;
