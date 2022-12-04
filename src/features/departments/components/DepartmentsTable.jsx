import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import { Oval } from 'react-loader-spinner';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { useNavigate, Link } from 'react-router-dom';
import {
	selectDepartmentIds,
	useGetDepartmentsQuery,
} from '../departmentsApiSlice';

const DepartmentsTable = () => {
	const { isLoading, isSuccess, isError, error } = useGetDepartmentsQuery();
	const navigate = useNavigate();

	const departmentIds = useSelector(selectDepartmentIds);
	console.log(departmentIds);

	let content;

	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = (
			<table className='min-w-full divide-y divide-gray-300'>
				<thead className='bg-gray-50'>
					<tr>
						<th
							scope='col'
							className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
						>
							Title
						</th>
						<th
							scope='col'
							className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
						>
							Description
						</th>

						<th
							scope='col'
							className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
						>
							Edit
						</th>
						<th
							scope='col'
							className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
						>
							Delete
						</th>
					</tr>
				</thead>
				<tbody className='bg-white'>
					{departmentIds.map((id) => {
						return <TableRow key={id} departmentId={id} />;
					})}
				</tbody>
			</table>
		);
	} else if (isError) {
		content = (
			<div className='mt-6'>
				<FeedbackAlert type='error' content={error} />
			</div>
		);
	}

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-2xl font-bold text-gray-900'>
					Departments
					</h1>
					<p className='mt-2 text-sm text-gray-700'>
						A list of all the departments in the system including
						their titles and descriptions.
					</p>
				</div>
				<div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
					<Link
						to='/admin/add-department'
						className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto'
					>
						Add Department
					</Link>
				</div>
			</div>
			<div className='mt-8 flex flex-col'>
				<div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
						<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
							{content}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DepartmentsTable;
