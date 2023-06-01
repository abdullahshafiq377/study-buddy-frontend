import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { compareDesc, parseISO } from 'date-fns';

const AssessmentGradesTableRow = ({assessment}) => {
	const today = new Date();
	const deadline = assessment.deadline ? new Date(assessment.deadline) : null;
	const compare = compareDesc(today, deadline);
	
	// parseISO()
	// 	.toString()
	// 	.split('G')[0];
	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{assessment.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{assessment.deadline ? parseISO(assessment.deadline)
					.toString()
					.split('G')[0] : 'N/A'}
			</td>
			<td className="whitespace-nowrap px-3 py-4">
				{compare === -1 ?
				 ''
				                :
				 (<Link
					 to={assessment.route}
					 type="button"
					 className="text-blue-600 hover:text-primary-900"
				 >
					 <ChevronRightIcon className="w-7"/>
				 </Link>)
				}
			
			</td>
		</tr>
	);
};

export default AssessmentGradesTableRow;
