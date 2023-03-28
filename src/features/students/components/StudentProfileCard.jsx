import React from 'react';

const StudentProfileCard = ({student}) => {
    return (
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <dl className='sm:divide-y sm:divide-gray-200'>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Full name
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.name ? student.name : 'N/A'}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Father's Name
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.f_name ? student.f_name : 'N/A'}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Registration Number
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.session}-{student.program_title}-{student.reg_num}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Email address
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.email}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Date of Birth
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.dob ? student.dob.split('T')[0] : 'N/A'}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Gender
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.gender ? student.gender.charAt(0).toUpperCase() + student.gender.slice(1) : 'N/A'}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Nationality
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.nationality ? student.nationality : 'N/A'}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Contact
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {student.contact ? student.contact : 'N/A'}
                    </dd>
                </div>
            </dl>
        </div>
    );
};

export default StudentProfileCard;
