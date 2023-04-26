import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetStudentByIdQuery } from '../../features/students/studentsApiSlice';
import StudentProfileCard from '../../features/students/components/StudentProfileCard';
import FeedbackAlert from '../../components/FeedbackAlert';
import StudentSetting from '../../features/students/components/StudentSetting';
import Loader from '../../components/Loader';

const StudentSettingsPage = () => {
	const studentId = useSelector(selectCurrentUserId);
	const {data, isLoading, isSuccess, isError, error} = useGetStudentByIdQuery(studentId);
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		const student = data.entities[studentId];
		content = (<StudentSetting student={student}/>);
	}
	else if (isError) {
		content = (
			<div className="mt-6">
				<FeedbackAlert type="error" content={error}/>
			</div>
		);
	}
	return (
		content
	);
};

export default StudentSettingsPage;
