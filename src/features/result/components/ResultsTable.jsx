import React from 'react';
import Loader from '../../../components/Loader';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import { useGetResultsByStudentQuery } from '../resultsApiSlice';
import ResultsTableRow from './ResultsTableRow';

const ResultsTable = () => {
	const userId = useSelector(selectCurrentUserId);
	
	const {isLoading, isSuccess, isError, data} = useGetResultsByStudentQuery(userId);
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		let {ids, entities} = data;
		console.log(data);
		content = (
			<>
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
						>
							Course Code
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Title
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Credit Hours
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							G.P.
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Marks
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Grade
						</th>
					</tr>
					</thead>
					<tbody className="bg-white">
					{ids.map((id) => {
						return <ResultsTableRow result={entities[id]}/>;
					})}
					</tbody>
				</table>
			</>
		);
	}
	else if (isError) {
		content = (<div className="mt-6">
			<FeedbackAlert type="error" content={'Replace with error'}/>
		</div>);
	}
	
	return (<div className="flex flex-col">
		<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					{content}
				</div>
			</div>
		</div>
	</div>);
};

export default ResultsTable;
