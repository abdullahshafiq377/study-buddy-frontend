import React from 'react';
import FeedbackAlert from './../../../components/FeedbackAlert';
import { useNavigate } from 'react-router-dom';
import UnregisteredCoursesTableRow from './UnregisteredCoursesTableRow';
import { useGetUnregisteredCoursesQuery } from '../registrationApiSlice';
import Loader from '../../../components/Loader';

const UnregisteredCoursesTable = ({studentId}) => {
	const {data, isLoading, isSuccess, isError, error} = useGetUnregisteredCoursesQuery(studentId);
	let courses, content;
	const navigate = useNavigate();
	
	if (isLoading) {
		content = <Loader/>;
	}
	else if (isSuccess) {
		courses = data.ids.map(id => {
			return data.entities[id];
		});
		console.log(courses);
		content = (<>
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
						>
							Course Code
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Title
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Credit Hours
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>
							Register
						</th>
					</tr>
					</thead>
					<tbody className="bg-white">
					{courses.map(course => {
						return <UnregisteredCoursesTableRow key={course.id} course={course} studentId={studentId}/>;
					})}
					</tbody>
				</table>
			</>
		);
	}
	else if (isError) {
		content = (
			<div className="mt-6">
				<FeedbackAlert type="error" content={'Replace with error'}/>
			</div>
		);
	}
	
	return (
		
		<div className="mt-4 flex flex-col">
			<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						{content}
					</div>
				</div>
			</div>
		</div>
	
	);
};

export default UnregisteredCoursesTable;
