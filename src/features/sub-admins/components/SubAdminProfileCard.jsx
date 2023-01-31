import {useSelector} from 'react-redux';
import {selectCurrentUserId} from '../../auth/authSlice';
import {useGetSubAdminByIdQuery} from '../subAdminsApiSlice';
import React from "react";

export default function SubAdminProfileCard() {
    const subAdminId = useSelector(selectCurrentUserId);
    const {data, isLoading, isSuccess, isError, error} = useGetSubAdminByIdQuery(subAdminId);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const subAdmin = data.entities[subAdminId];
        content = (<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <dl className='sm:divide-y sm:divide-gray-200'>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Full name
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.name}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Father's Name
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.f_name}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Email address
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.email}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Date of Birth
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.dob.split('T')[0]}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Gender
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.gender.charAt(0).toUpperCase() + subAdmin.gender.slice(1)}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Nationality
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.nationality}
                    </dd>
                </div>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                        Contact
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {subAdmin.contact}
                    </dd>
                </div>
            </dl>
        </div>)
    }

    return (<div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Profile
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Personal details.
            </p>
        </div>
        {content}

    </div>);
}
