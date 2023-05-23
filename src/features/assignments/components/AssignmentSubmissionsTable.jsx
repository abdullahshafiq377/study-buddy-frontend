import React from 'react';
import AssignmentSubmissionsTableRow from './AssignmentSubmissionsTableRow';
import Loader from '../../../components/Loader';
import FeedbackAlert from '../../../components/FeedbackAlert';

const AssignmentSubmissionsTable = ({
	                                    data, isSuccess, isLoading, isError, assignmentSubmissions,
	                                    setAssignmentSubmissions
                                    }) => {
	
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
						Name
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Reg #
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Submission
					</th>
				</tr>
				</thead>
				<tbody className="bg-white">
				{data?.ids.map(id => {
					return <AssignmentSubmissionsTableRow submission={data.entities[id]}/>;
				})}
				</tbody>
			</table>
		);
	}
	else if (isError) {
		content = (<div className="mt-6">
			<FeedbackAlert type="error" content={'Replace with error'}/>
		</div>);
	}
	
	return (<>
		{data?.ids.length ?
		 content
		                  :
		 (<p className="py-4 pl-4 pr-3 text-sm font-medium text-red-600">No Submissions</p>)}
	</>);
};

export default AssignmentSubmissionsTable;
