import React, { useState } from 'react';
import { formatISO } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { selectCurrentUserDepartmentId } from '../../auth/authSlice';
import { useGetSectionsByDepartmentQuery } from '../../sections/sectionsApiSlice';
import ViewAssignmentSlideOver from './ViewAssignmentSlideOver';

const StudentAssignmentsTableRow = ({assignment}) => {
	const [openViewAssignmentSlideOver, setOpenViewAssignmentSlideOver] = useState(false);
	const departmentId = useSelector(selectCurrentUserDepartmentId);
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByDepartmentQuery(departmentId);
	let section = '';
	if (isSuccessSection) {
		section = sectionData.entities[assignment.section_id];
	}
	return (
		<tr key={assignment?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{assignment?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section?.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{assignment?.end_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(assignment?.end_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					type="button"
					onClick={() => setOpenViewAssignmentSlideOver(!openViewAssignmentSlideOver)}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</button>
			</td>
			<ViewAssignmentSlideOver open={openViewAssignmentSlideOver} setOpen={setOpenViewAssignmentSlideOver}
			                         assignment={assignment} section={section}/>
		</tr>
	);
};

export default StudentAssignmentsTableRow;
