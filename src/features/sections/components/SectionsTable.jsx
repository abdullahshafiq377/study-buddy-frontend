import React from 'react';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { useGetSectionsByDepartmentQuery } from '../sectionsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserDepartmentId } from '../../auth/authSlice';
import SectionsTableRow from './SectionsTableRow';
import Loader from '../../../components/Loader';

const SectionsTable = () => {
	const departmentId = useSelector(selectCurrentUserDepartmentId);
	const {data, isLoading, isSuccess, isError, error} = useGetSectionsByDepartmentQuery(departmentId);
	
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		const {ids, entities} = data;
		content = (<>
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
						Course
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Semester
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Instructor
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Edit
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
				{ids.map(id => <SectionsTableRow key={id} section={entities[id]}/>)}
				</tbody>
			</table>
		</>);
	}
	else if (isError) {
		content = (<div className="mt-6">
			<FeedbackAlert type="error" content={'Replace with error'}/>
		</div>);
	}
	return (<div className="mt-4 flex flex-col">
		<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					{content}
				</div>
			</div>
		</div>
	</div>);
};

export default SectionsTable;
