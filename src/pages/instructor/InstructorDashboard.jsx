import React from 'react';
import InstructorDashboardTable from '../../features/instructors/components/InstructorDashboardTable';

const InstructorDashboard = () => {
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							Dashboard
						</h1>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<InstructorDashboardTable/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InstructorDashboard;
