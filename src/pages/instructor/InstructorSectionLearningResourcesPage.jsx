import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAssignedStudentsQuery, useGetSectionByIdQuery } from '../../features/sections/sectionsApiSlice';
import InstructorLearningResourceTable
	from '../../features/learning-resource/components/InstructorLearningResourceTable';

const InstructorSectionAttendancePage = () => {
	const {sectionId} = useParams();
	
	const {isSuccess: assignedStudentsIsSuccess, data: assignedStudentsData} = useGetAssignedStudentsQuery(sectionId);
	const {isSuccess: sectionIsSuccess, data: sectionData} = useGetSectionByIdQuery(sectionId);
	let section = {
		title: '',
		course_title: '',
		semester: '',
		instructor_name: '',
		strength: '',
	};
	
	if (sectionIsSuccess && assignedStudentsIsSuccess) {
		section = {...sectionData.entities[sectionId]};
		section.strength = assignedStudentsData?.length;
	}
	
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
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
			
			<div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4">
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
								{section.strength}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<div>
				<h3 className="text-l font-bold leading-6 text-gray-900 mt-8 mb-4">
					Learning Resources
				</h3>
				<InstructorLearningResourceTable sectionId={sectionId}/>
			</div>
		</div>
	);
};

export default InstructorSectionAttendancePage;
