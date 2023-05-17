import React from 'react';

export default function InstructorProfileCard ({instructor}) {
	return (
		<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
			<dl className="sm:divide-y sm:divide-gray-200">
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Full name
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.name}
					</dd>
				</div>
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Father's Name
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.f_name}
					</dd>
				</div>
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Email address
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.email}
					</dd>
				</div>
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Date of Birth
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.dob.split('T')[0]}
					</dd>
				</div>
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Gender
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.gender.charAt(0)
						           .toUpperCase() + instructor.gender.slice(1)}
					</dd>
				</div>
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Nationality
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.nationality}
					</dd>
				</div>
				<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
					<dt className="text-sm font-medium text-gray-500">
						Contact
					</dt>
					<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						{instructor.contact}
					</dd>
				</div>
			</dl>
		</div>);
}
