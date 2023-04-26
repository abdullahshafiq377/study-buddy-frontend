import React from 'react';
import InstructorMeetingsTableRow from './InstructorMeetingsTableRow';

const InstructorMeetingsTable = () => {
	return (
		<>
			{true ?
			 (<>
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
								 Cancle
							 </th>
							 <th
								 scope="col"
								 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							 >
								 Join
							 </th>
						 </tr>
						 </thead>
						 <tbody className="bg-white">
						 <InstructorMeetingsTableRow/>
						 </tbody>
					 </table>
				 </>
			 )
			      :
			 (<p className="py-4 pl-4 pr-3 text-sm font-medium text-red-600">No Meetings Found</p>)}
		</>
	);
};

export default InstructorMeetingsTable;
