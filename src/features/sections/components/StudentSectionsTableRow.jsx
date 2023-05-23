import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const StudentSectionsTableRow = ({section, instructorData}) => {
	return (
		<tr key={section.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{section.section_id ? section.title : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.course_title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{section.section_id ? instructorData.entities[section.instructor_id]?.name : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{
					section.section_id ?
					<Link
						type="button"
						to={section.section_id}
						className="text-blue-600 hover:text-primary-900"
					>
						<ChevronRightIcon className="w-7"/>
					</Link>
					                   :
					''
				}
			</td>
		</tr>
	);
};

export default StudentSectionsTableRow;
