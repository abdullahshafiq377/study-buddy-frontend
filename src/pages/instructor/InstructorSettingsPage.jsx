import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetInstructorByIdQuery } from '../../features/instructors/instructorsApiSlice';
import InstructorSetting from '../../features/instructors/components/InstructorSetting';
import Loader from '../../components/Loader';

const InstructorSettingsPage = () => {
	const instructorId = useSelector(selectCurrentUserId);
	const {data, isLoading, isSuccess, isError, error} = useGetInstructorByIdQuery(instructorId);
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		const instructor = data.entities[instructorId];
		content = (<InstructorSetting instructor={instructor}/>);
	}
	return (
		content
	
	);
};

export default InstructorSettingsPage;
