import React from 'react';
import StudentAssignmentsTableRow from './StudentAssignmentsTableRow';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../auth/authSlice';
import { useGetRegisteredCoursesQuery } from '../../registration/registrationApiSlice';

const StudentAssignmentsTable = ({assignments}) => {
	let myAssignments = [];
	const userId = useSelector(selectCurrentUserId);
	const {data: registrationData, isSuccess: registrationIsSuccess} = useGetRegisteredCoursesQuery(userId);
	let sectionIds = [];
	if (registrationIsSuccess) {
		const {ids, entities} = registrationData;
		ids.map(id => {
			if (entities[id].section_id !== null) {
				sectionIds.push(entities[id].section_id);
			}
		});
		
		if (sectionIds.length && assignments?.length) {
			sectionIds.map(id => {
				assignments.map(assignment => {
					if (id === assignment.section_id) {
						myAssignments.push(assignment);
					}
				});
			});
		}
	}
	
	return (
		<>
			{myAssignments.length ?
			 (
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
							 Section
						 </th>
						 <th
							 scope="col"
							 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						 >
							 Due Time
						 </th>
						 <th
							 scope="col"
							 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						 >
							 Due Date
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
					 {myAssignments.length ?
					  (myAssignments.map(assignment => {
						  return <StudentAssignmentsTableRow assignment={assignment}/>;
					  }))
					                       :
					  ''
					 }
					 </tbody>
				 </table>
			 )
			                      :
			 (<p className="py-4 pl-4 pr-3 text-sm font-medium text-red-600">No Assignments Found</p>)}
		
		</>
	);
};

export default StudentAssignmentsTable;
