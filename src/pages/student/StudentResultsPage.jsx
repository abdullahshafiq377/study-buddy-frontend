import React from 'react';
import ResultsTable from '../../features/result/components/ResultsTable';

const StudentSectionResultsPage = () => {
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							Results
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the sub admins in the system including
							their names, emails, genders and contact numbers.
						</p>
					</div>
				</div>
				<div className="mt-12">
					<ResultsTable/>
				</div>
			</div>
		</>
	);
};

export default StudentSectionResultsPage;
