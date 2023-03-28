import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUserId} from "../../features/auth/authSlice";
import {useGetInstructorByIdQuery} from "../../features/instructors/instructorsApiSlice";
import InstructorProfileCard from "../../features/instructors/components/InstructorProfileCard";
import InstructorSetting from "../../features/instructors/components/InstructorSetting";

const InstructorSettingsPage = () => {
    const instructorId = useSelector(selectCurrentUserId);
    const {data, isLoading, isSuccess, isError, error} = useGetInstructorByIdQuery(instructorId);

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const instructor = data.entities[instructorId];
        content = (<InstructorSetting instructor={instructor}/>)
    }
    return (
        content

    );
};

export default InstructorSettingsPage;
