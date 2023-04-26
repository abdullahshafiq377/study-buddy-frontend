import React from 'react';
import StudentProfileCard from '../../features/students/components/StudentProfileCard';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetStudentByIdQuery } from '../../features/students/studentsApiSlice';
import FeedbackAlert from '../../components/FeedbackAlert';
import Loader from '../../components/Loader';

const StudentProfilePage = () => {
	const studentId = useSelector(selectCurrentUserId);
	const {data, isLoading, isSuccess, isError, error} = useGetStudentByIdQuery(studentId);
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		const student = data.entities[studentId];
		content = (<StudentProfileCard student={student}/>);
	}
	else if (isError) {
		content = (
			<div className="mt-6">
				<FeedbackAlert type="error" content={error}/>
			</div>
		);
	}
	
	return (
		<div className="overflow-hidden bg-white shadow sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg font-medium leading-6 text-gray-900">
					Profile
				</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">
					Personal details.
				</p>
			</div>
			{content}
		
		</div>
	);
};

export default StudentProfilePage;
