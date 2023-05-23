import StudentGradesTableRow from './StudentGradesTableRow';
import React from 'react';

export default function StudentQuizzesGradesTable ({grade}) {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Quizzes</h1>
				</div>
			</div>
			<div className="mt-4 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						{
							grade?.q1_total || grade?.q2_total || grade?.q3_total || grade?.q4_total ?
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
										grade?.q1_total > 0 ?
										(<StudentGradesTableRow key="q1" title="Quiz 1"
										                        total={grade?.q1_total}
										                        obtained={grade?.q1_obt}/>)
										                    :
										''
									}
									{
										grade?.q2_total > 0 ?
										(<StudentGradesTableRow key="q2" title="Quiz 2"
										                        total={grade?.q2_total}
										                        obtained={grade?.q2_obt}/>)
										                    :
										''
									}
									{
										grade?.q3_total > 0 ?
										(<StudentGradesTableRow key="q3" title="Quiz 3"
										                        total={grade?.q3_total}
										                        obtained={grade?.q3_obt}/>)
										                    :
										''
									}
									{
										grade?.q4_total > 0 ?
										(<StudentGradesTableRow key="q4" title="Quiz 4"
										                        total={grade?.q4_total}
										                        obtained={grade?.q4_obt}/>)
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
