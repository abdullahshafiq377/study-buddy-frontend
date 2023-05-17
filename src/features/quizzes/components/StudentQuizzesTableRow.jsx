import React, { useState } from 'react';
import { formatISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { selectCurrentUserDepartmentId } from '../../auth/authSlice';
import { useGetSectionsByDepartmentQuery } from '../../sections/sectionsApiSlice';
import ViewQuizSlideOver from './ViewQuizSlideOver';

const StudentQuizzesTableRow = ({quiz}) => {
	const [openViewQuizSlideOver, setOpenViewQuizSlideOver] = useState(false);
	const departmentId = useSelector(selectCurrentUserDepartmentId);
	const {data: sectionData, isSuccess: isSuccessSection} = useGetSectionsByDepartmentQuery(departmentId);
	let section = '';
	if (isSuccessSection) {
		section = sectionData.entities[quiz.section_id];
	}
	return (
		<tr key={quiz?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{quiz?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section?.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{quiz?.end_time.slice(0, 5)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatISO(new Date(quiz?.end_date), {representation: 'date'})}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					type="button"
					onClick={() => setOpenViewQuizSlideOver(!openViewQuizSlideOver)}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</button>
			</td>
			<ViewQuizSlideOver open={openViewQuizSlideOver} setOpen={setOpenViewQuizSlideOver}
			                   quiz={quiz} section={section}/>
		</tr>
	);
};

export default StudentQuizzesTableRow;
