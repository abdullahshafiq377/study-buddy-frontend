import React from 'react';
import SubAdminSetting from '../../features/sub-admins/components/SubAdminSetting';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetSubAdminByIdQuery } from '../../features/sub-admins/subAdminsApiSlice';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

const SubAdminSettingsPage = () => {
	const subAdminId = useSelector(selectCurrentUserId);
	const {data, isLoading, isSuccess, isError, error} = useGetSubAdminByIdQuery(subAdminId);
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		const subAdmin = data.entities[subAdminId];
		content = (<SubAdminSetting subAdmin={subAdmin}/>);
	}
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-bold text-gray-900">
						Settings
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the courses in the system including their
						name and email.
					</p>
				</div>
			</div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						{content}
					
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubAdminSettingsPage;

