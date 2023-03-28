import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUserId} from "../../features/auth/authSlice";
import {useGetInstructorByIdQuery} from "../../features/instructors/instructorsApiSlice";
import InstructorProfileCard from "../../features/instructors/components/InstructorProfileCard";

const InstructorProfilePage = () => {
    const instructorId = useSelector(selectCurrentUserId);
    const {data, isLoading, isSuccess, isError, error} = useGetInstructorByIdQuery(instructorId);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const instructor = data.entities[instructorId];
        content = (<InstructorProfileCard instructor={instructor}/>)
    }

    return (
        <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Profile
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Personal details.
                </p>
            </div>
            {content}
        </div>
    );
};

export default InstructorProfilePage;
