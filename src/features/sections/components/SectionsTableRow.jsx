import React, { useState } from 'react';
import { ChevronRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import EditSectionSlideover from './EditSectionSlideover';
import { Link } from 'react-router-dom';

const SectionsTableRow = ({section}) => {
	const [opedEditSectionSlideOver, setOpedEditSectionSlideOver] = useState(false);
	
	return (
		<tr key={section.id}>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.semester}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.instructor_id ? section.instructor_name : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button
					type="button"
					onClick={() => setOpedEditSectionSlideOver(true)}
					className="text-blue-600 hover:text-primary-900"
				
				>
					<PencilSquareIcon className="w-7"/>
				</button>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					to={section.id}
					className="text-blue-600 hover:text-primary-900"
				
				>
					<ChevronRightIcon className="w-7"/>
				</Link>
			</td>
			<EditSectionSlideover
				open={opedEditSectionSlideOver}
				setOpen={setOpedEditSectionSlideOver}
				section={section}/>
		</tr>
	);
};

export default SectionsTableRow;
