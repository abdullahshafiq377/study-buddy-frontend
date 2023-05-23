import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { formatISO } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const ResultsTableRow = ({result}) => {
	return (
		<tr key={result?.id}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				{result?.course_code}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{result?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{result?.credit_hours}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{Math.round((result?.gp) * 100) / 100}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{Math.round((result?.obtained_marks) * 100) / 100}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{result?.grade ? result?.grade : 'N/A'}
			</td>
		</tr>
	);
};

export default ResultsTableRow;
