import React from 'react';
import AssignmentSubmissionsTable from '../../features/assignments/components/AssignmentSubmissionsTable';
import { useParams } from 'react-router-dom';
import { useGetAssignmentSubmissionsQuery } from '../../features/assignments/assignmentSubmissionApiSlice';
import axios from 'axios';

const InstructorAssignmentSubmissionsPage = () => {
	const {assignmentId} = useParams();
	
	const {isLoading, isSuccess, isError, data} = useGetAssignmentSubmissionsQuery(assignmentId);
	let submissions = [];
	
	if (isSuccess) {
		data.ids.map(id => {
			submissions.push({
				                 fileName: data.entities[id].student_name + '.' + data.entities[id].file_path.split(
					                 '.')[1],
				                 filePath: data.entities[id].file_path
			                 });
		});
		console.log(submissions);
	}
	
	const handleGeneratePlagReport = () => {
		console.log(submissions);
		const formData = new FormData();
		let names = [];
		let files = [];
		submissions.map(submission => {
			names.push(submission.fileName);
			files.push(submission.filePath);
		});
		
		console.log(names);
		console.log(files);
		
		formData.append('files', files);
		formData.append('names', names);
		axios.post('http://localhost:5000/uploader', formData);
	};
	
	
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							Assignment Submissions
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the sub admins in the system including
							their names, emails, genders and contact numbers.
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<button
							onClick={handleGeneratePlagReport}
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
						>
							Generate Plag Report
						</button>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<AssignmentSubmissionsTable
									data={data} isLoading={isLoading} isError={isError}
									isSuccess={isSuccess}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InstructorAssignmentSubmissionsPage;
