import React, { useState } from 'react';
import InstructorSectionsTable from '../../features/sections/components/InstructorSectionsTable';
import NewAssignmentSlideOver from '../../features/assignments/components/NewAssignmentSlideOver';
import ViewAssignmentSlideOver from '../../features/assignments/components/ViewAssignmentSlideOver';
import UserNoticesTable from '../../features/notices/components/UserNoticesTable';

const UserNoticesPage = () => {
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							Notices
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the sub admins in the system including
							their names, emails, genders and contact numbers.
						</p>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<UserNoticesTable/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserNoticesPage;

