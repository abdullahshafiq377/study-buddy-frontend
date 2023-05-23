import StudentGradesTableRow from './StudentGradesTableRow';
import React from 'react';

export default function StudentAssignmentGradesTable ({grade}) {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Assignments</h1>
				</div>
			</div>
			<div className="mt-4 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						{
							grade?.a1_total || grade?.a2_total || grade?.a3_total || grade?.a4_total ?
							(
								<table className="min-w-full divide-y divide-gray-300">
									<thead>
									<tr>
										<th scope="col"
										    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
											Title
										</th>
										<th scope="col"
										    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Total
										</th>
										<th scope="col"
										    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Obtained
										</th>
									</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
									{
										grade?.a1_total > 0 ?
										(<StudentGradesTableRow key="a1" title="Assignment 1"
										                        total={grade?.a1_total}
										                        obtained={grade?.a1_obt}/>)
										                    :
										''
									}
									{
										grade?.a2_total > 0 ?
										(<StudentGradesTableRow key="a2" title="Assignment 2"
										                        total={grade?.a2_total}
										                        obtained={grade?.a2_obt}/>)
										                    :
										''
									}
									{
										grade?.a3_total > 0 ?
										(<StudentGradesTableRow key="a3" title="Assignment 3"
										                        total={grade?.a3_total}
										                        obtained={grade?.a3_obt}/>)
										                    :
										''
									}
									{
										grade?.a4_total > 0 ?
										(<StudentGradesTableRow key="a4" title="Assignment 4"
										                        total={grade?.a4_total}
										                        obtained={grade?.a4_obt}/>)
										                    :
										''
									}
									
									</tbody>
								</table>
							)
							                                                                         :
							(<p className="py-4 pl-4 pr-3 text-sm font-medium text-red-600">No Grades Available</p>)
						}
					
					</div>
				</div>
			</div>
		</div>
	);
}
