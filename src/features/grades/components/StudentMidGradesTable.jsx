import StudentGradesTableRow from './StudentGradesTableRow';
import React from 'react';

export default function StudentMidGradesTable ({grade}) {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Mid</h1>
				</div>
			</div>
			<div className="mt-4 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						{
							grade?.mid_total ?
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
										grade?.mid_total > 0 ?
										(<StudentGradesTableRow key="mid" title="Mid-Term"
										                        total={grade?.mid_total}
										                        obtained={grade?.mid_obt}/>)
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
