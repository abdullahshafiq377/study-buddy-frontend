import React from 'react';
import AssignedStudentsTable from './AssignedStudentsTable';
import UnassignedStudentsTable from './UnassignedStudentsTable';
import { useGetAssignedStudentsQuery, useGetUnassignedStudentsQuery } from '../sectionsApiSlice';
import Loader from '../../../components/Loader';

const SectionDetails = ({section}) => {
	
	const {
		data: assignedStudents,
		isLoading: isLoadingAssigned,
		isSuccess: isSuccessAssigned,
		isError: isErrorAssigned,
		refetch: refetchAssigned
	} = useGetAssignedStudentsQuery(section.id);
	
	const {
		data: unassignedStudents,
		isLoading: isLoadingUnassigned,
		isSuccess: isSuccessUnassigned,
		isError: isErrorUnassigned,
		refetch: refetchUnassigned
	} = useGetUnassignedStudentsQuery(section.course_id);
	
	let assignedTable, unassignedTable;
	if (isLoadingAssigned) {
		assignedTable = <Loader/>;
	}
	else if (isSuccessAssigned) {
		console.log(assignedStudents);
		
		assignedTable = (<AssignedStudentsTable
			section={section}
			assignedStudents={assignedStudents}
			refetchAssigned={refetchAssigned}
			refetchUnassigned={refetchUnassigned}
		/>);
	}
	
	if (isLoadingUnassigned) {
		unassignedTable = <p>Loading...</p>;
	}
	else if (isSuccessUnassigned) {
		console.log(unassignedStudents);
		unassignedTable = (<UnassignedStudentsTable
			section={section}
			unassignedStudents={unassignedStudents}
			refetchAssigned={refetchAssigned}
			refetchUnassigned={refetchUnassigned}
		/>);
	}
	
	
	return (<div className="px-4 sm:px-6 lg:px-8">
		<div className="sm:flex sm:items-center">
			<div className="sm:flex-auto">
				<h1 className="text-2xl font-bold text-gray-900">
					{section.title}
				</h1>
				<p className="mt-2 text-sm text-gray-700">
					{section.course_title}
				</p>
			</div>
		</div>
		
		<div className="overflow-hidden bg-white shadow sm:rounded-lg">
			<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
				<dl className="sm:divide-y sm:divide-gray-200">
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Semester
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{section.semester}
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Instructor
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{section.instructor_name}
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Strength
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
						
						</dd>
					</div>
				</dl>
			</div>
		</div>
		
		<div>
			<h3 className="text-l font-bold leading-6 text-gray-900 mt-8">
				Assigned Students
			</h3>
			{assignedTable}
		</div>
		<div>
			<h3 className="text-l font-bold leading-6 text-gray-900 mt-8">
				Unassigned Students
			</h3>
			{unassignedTable}
		</div>
	</div>);
};

export default SectionDetails;
