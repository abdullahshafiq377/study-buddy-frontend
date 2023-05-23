import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import AddGradesSlideOver from './AddGradesSlideOver';

const InstructorStudentGradesTableRow = ({grade}) => {
	const [openAddGradesSlideOver, setOpenAddGradesSlideOver] = useState(false);
	return (
		<tr key={grade?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{grade?.student_name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{grade?.session}-{grade?.program_title}-{grade?.reg_num}
			</td>
			<td className="whitespace-nowrap px-3 py-4">
				<button
					type="button"
					onClick={() => setOpenAddGradesSlideOver(!openAddGradesSlideOver)}
					className="text-blue-600 hover:text-primary-900"
				>
					<ChevronRightIcon className="w-7"/>
				</button>
			</td>
			<AddGradesSlideOver open={openAddGradesSlideOver} setOpen={setOpenAddGradesSlideOver} grade={grade}/>
		</tr>
	);
};

export default InstructorStudentGradesTableRow;
