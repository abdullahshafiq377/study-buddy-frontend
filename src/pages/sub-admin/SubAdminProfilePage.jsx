import React from 'react';
import SubAdminProfileCard from '../../features/sub-admins/components/SubAdminProfileCard';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetSubAdminByIdQuery } from '../../features/sub-admins/subAdminsApiSlice';
import Loader from '../../components/Loader';

const SubAdminProfilePage = () => {
	const subAdminId = useSelector(selectCurrentUserId);
	const {data, isLoading, isSuccess, isError, error} = useGetSubAdminByIdQuery(subAdminId);
	
	let content, subAdmin;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		subAdmin = data.entities[subAdminId];
		content = (<SubAdminProfileCard subAdmin={subAdmin}/>);
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

export default SubAdminProfilePage;
