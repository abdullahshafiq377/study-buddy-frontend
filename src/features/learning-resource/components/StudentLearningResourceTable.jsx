import React from 'react';
import FeedbackAlert from '../../../components/FeedbackAlert';
import Loader from '../../../components/Loader';
import { useGetLearningResourcesBySectionQuery } from '../learningResourcesApiSlice';
import StudentLearningResourceTableRow from './StudentLearningResourceTableRow';

const StudentLearningResourceTable = ({sectionId}) => {
	const {isLoading, isSuccess, isError, data} = useGetLearningResourcesBySectionQuery(sectionId);
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		const {ids, entities} = data;
		content = (
			<>
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
							Resource
						</th>
					</tr>
					</thead>
					<tbody className="bg-white">
					{ids.map(id => {
						return <StudentLearningResourceTableRow learningResource={entities[id]}/>;
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
	return content;
};

export default StudentLearningResourceTable;
