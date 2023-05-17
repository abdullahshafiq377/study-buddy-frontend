import React from 'react';

export default function UserProfileCard () {
	
	return (
		<>
			<div className="overflow-hidden bg-white shadow sm:rounded-lg mt-8">
				<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
					<dl className="sm:divide-y sm:divide-gray-200">
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Full name
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								test
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Father's Name
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								test
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Email address
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								test@test.com
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Gender
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{/*subAdmin.gender.charAt(0).toUpperCase() + subAdmin.gender.slice(1)*/}
								test
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Contact
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								1234
							</dd>
						</div>
					</dl>
				
				</div>
			</div>
			<div className="flex justify-end mt-4">
				<button
					type="button"
					className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
				>
					Reset Password
				</button>
			</div>
		</>
	
	);
}
