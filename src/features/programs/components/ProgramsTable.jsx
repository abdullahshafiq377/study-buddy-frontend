import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { Link, useNavigate } from 'react-router-dom';
import { selectProgramIds, useGetProgramsQuery } from '../programsApiSlice';
import Loader from '../../../components/Loader';

const ProgramsTable = () => {
	const {isLoading, isSuccess, isError, error} = useGetProgramsQuery();
	const navigate = useNavigate();
	
	const programIds = useSelector(selectProgramIds);
	console.log(programIds);
	
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
						Description
					</th>
					
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Edit
					</th>
				</tr>
				</thead>
				<tbody className="bg-white">
				{programIds.map((id) => {
					return <TableRow key={id} programId={id}/>;
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
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-bold text-gray-900">
						Programs
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the programs in the system displaying their
						titles and descriptions.
					</p>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<Link
						to="add"
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
					>
						Add Program
					</Link>
				</div>
			</div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							{content}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProgramsTable;
