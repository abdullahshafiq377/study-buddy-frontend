import React from 'react';
import FeedbackAlert from '../../../components/FeedbackAlert';
import { useGetStudentSectionsQuery } from '../sectionsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import Loader from '../../../components/Loader';
import { useGetInstructorsQuery } from '../../instructors/instructorsApiSlice';
import StudentSectionsTableRow from './StudentSectionsTableRow';

const StudentSectionsTable = () => {
	const userId = useSelector(selectCurrentUserId);
	
	const {isLoading, isSuccess, isError, data} = useGetStudentSectionsQuery(userId);
	const {isSuccess: instructorIsSuccess, data: instructorData} = useGetInstructorsQuery();
	
	let content;
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess && instructorIsSuccess) {
		console.log(instructorData);
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
							Course
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
							View
						</th>
					</tr>
					</thead>
					<tbody className="bg-white">
					{data.map(section => <StudentSectionsTableRow key={section.id} section={section}
					                                              instructorData={instructorData}/>)}
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

export default StudentSectionsTable;
