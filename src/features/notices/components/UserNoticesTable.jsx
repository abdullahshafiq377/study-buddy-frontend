import React from 'react';
import { useSelector } from 'react-redux';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { useNavigate } from 'react-router-dom';
import { selectNoticeIds, useGetNoticesQuery } from '../noticesApiSlice';
import Loader from '../../../components/Loader';
import UserNoticesTableRow from './UserNoticesTableRow';

const UserNoticesTable = () => {
	const {isLoading, isSuccess, isError, error} = useGetNoticesQuery();
	const navigate = useNavigate();
	
	const noticeIds = useSelector(selectNoticeIds);
	console.log(noticeIds);
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		content = (
			<table className="min-w-full divide-y divide-gray-300">
				<thead className="bg-gray-50">
				<tr>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
					>
						Title
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Link
					</th>
					
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						View
					</th>
				</tr>
				</thead>
				<tbody className="bg-white">
				{noticeIds.map((id) => {
					return <UserNoticesTableRow key={id} noticeId={id}/>;
				})}
				</tbody>
			</table>
		);
	}
	else if (isError) {
		content = (
			<div className="mt-6">
				<FeedbackAlert type="error" content={error}/>
			</div>
		);
	}
	
	return (content);
};

export default UserNoticesTable;
