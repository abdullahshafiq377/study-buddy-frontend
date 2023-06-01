import React, { useEffect, useState } from 'react';
import AssessmentGradesTableRow from './AssessmentGradesTableRow';
import axios from 'axios';
import { useGetResultDeadlinesQuery } from '../../result/resultsApiSlice';
import { format, formatISO, formatISO9075, parseISO } from 'date-fns';

const AssessmentGradesTable = ({sectionId}) => {
	const [deadlines, setDeadlines] = useState(null);
	
	useEffect(() => {
		axios.get('http://localhost:8000/api/v1/results/deadline')
		     .then((r) => {
			     setDeadlines(r.data[0]);
		     });
	}, []);
	
	// let assignmentDeadline = format(new Date(deadlines?.quiz_deadline?.split('.')[0]), 'dd/MM/yyyy');
	// console.log(parseISO(deadlines?.assignment_deadline)
	// 	            .toString()
	// 	            .split('G')[0]);
	const assessments = [
		{
			title: 'Assignment 1',
			deadline: deadlines?.assignment_deadline ? deadlines?.assignment_deadline : null,
			route: `/instructor/grades/assignment1/${sectionId}`
		}, {
			title: 'Assignment 2',
			deadline: deadlines?.assignment_deadline ? deadlines?.assignment_deadline : null,
			route: `/instructor/grades/assignment2/${sectionId}`
		}, {
			title: 'Assignment 3',
			deadline: deadlines?.assignment_deadline ? deadlines?.assignment_deadline : null,
			route: `/instructor/grades/assignment3/${sectionId}`
		}, {
			title: 'Assignment 4',
			deadline: deadlines?.assignment_deadline ? deadlines?.assignment_deadline : null,
			route: `/instructor/grades/assignment4/${sectionId}`
		}, {
			title: 'Quiz 1',
			deadline: deadlines?.quiz_deadline ? deadlines?.quiz_deadline : null,
			route: `/instructor/grades/quiz1/${sectionId}`
		}, {
			title: 'Quiz 2',
			deadline: deadlines?.quiz_deadline ? deadlines?.quiz_deadline : null,
			route: `/instructor/grades/quiz2/${sectionId}`
		}, {
			title: 'Quiz 3',
			deadline: deadlines?.quiz_deadline ? deadlines?.quiz_deadline : null,
			route: `/instructor/grades/quiz3/${sectionId}`
		}, {
			title: 'Quiz 4',
			deadline: deadlines?.quiz_deadline ? deadlines?.quiz_deadline : null,
			route: `/instructor/grades/quiz4/${sectionId}`
		}, {
			title: 'Midterm',
			deadline: deadlines?.mid_deadline ? deadlines?.mid_deadline : null,
			route: `/instructor/grades/mid/${sectionId}`
		}, {
			title: 'Terminal',
			deadline: deadlines?.terminal_deadline ? deadlines?.terminal_deadline : null,
			route: `/instructor/grades/terminal/${sectionId}`
		},
	];
	return (
		<div className="mt-8 flex flex-col">
			<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
								>
									Title
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Deadline
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									View
								</th>
							</tr>
							</thead>
							<tbody className="bg-white">
							{assessments.map(assessment => {
								return <AssessmentGradesTableRow assessment={assessment}/>;
							})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssessmentGradesTable;
