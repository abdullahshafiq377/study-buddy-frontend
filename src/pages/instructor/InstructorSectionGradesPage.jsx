import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetAssignedStudentsQuery, useGetSectionByIdQuery } from '../../features/sections/sectionsApiSlice';
import TextInput from '../../components/TextInput';
import { useGetGradesBySectionQuery, useUpdateGradeMutation } from '../../features/grades/gradesApiSlice';

const InstructorSectionGradesPage = () => {
	const {sectionId, type} = useParams();
	
	const navigate = useNavigate();
	
	const {isLoading, isSuccess, isError, data} = useGetGradesBySectionQuery(sectionId);
	const [updateGrades] = useUpdateGradeMutation();
	
	const {isSuccess: assignedStudentsIsSuccess, data: assignedStudentsData} = useGetAssignedStudentsQuery(sectionId);
	const {isSuccess: sectionIsSuccess, data: sectionData} = useGetSectionByIdQuery(sectionId);
	let section = {
		title: '',
		course_title: '',
		semester: '',
		instructor_name: '',
		strength: '',
	};
	
	if (sectionIsSuccess && assignedStudentsIsSuccess) {
		section = {...sectionData.entities[sectionId]};
		section.strength = assignedStudentsData?.length;
	}
	
	let dbGrades = {};
	let tm = 0;
	let pt = '';
	const [assessmentMarks, setAssessmentMarks] = useState({});
	const [totalMarks, setTotalMarks] = useState(tm);
	const [pageTitle, setPageTitle] = useState('');
	
	if (isSuccess) {
		switch (type) {
			case 'assignment1':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.a1_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.a1_total ? data?.entities[data?.ids[0]]?.a1_total : 0;
				pt = 'Assignment 1';
				break;
			case 'assignment2':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.a2_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.a2_total ? data?.entities[data?.ids[0]]?.a2_total : 0;
				pt = 'Assignment 2';
				break;
			case 'assignment3':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.a3_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.a3_total ? data?.entities[data?.ids[0]]?.a3_total : 0;
				pt = 'Assignment 3';
				break;
			case 'assignment4':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.a4_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.a4_total ? data?.entities[data?.ids[0]]?.a4_total : 0;
				pt = 'Assignment 4';
				break;
			case 'quiz1':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.q1_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.q1_total ? data?.entities[data?.ids[0]]?.q1_total : 0;
				pt = 'Quiz 1';
				break;
			case 'quiz2':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.q2_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.q2_total ? data?.entities[data?.ids[0]]?.q2_total : 0;
				pt = 'Quiz 2';
				break;
			case 'quiz3':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.q3_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.q3_total ? data?.entities[data?.ids[0]]?.q3_total : 0;
				pt = 'Quiz 3';
				break;
			case 'quiz4':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.q4_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.q4_total ? data?.entities[data?.ids[0]]?.q4_total : 0;
				pt = 'Quiz 4';
				break;
			case 'mid':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.mid_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.mid_total ? data?.entities[data?.ids[0]]?.mid_total : 0;
				pt = 'Mid-Term';
				break;
			case 'terminal':
				data?.ids?.map(id => {
					               dbGrades[id] = {marksObt: data?.entities[id]?.terminal_obt};
				               }
				);
				tm = data?.entities[data?.ids[0]]?.terminal_total ? data?.entities[data?.ids[0]]?.terminal_total : 0;
				pt = 'Terminal';
				break;
		}
	}
	
	useEffect(() => {
		setTotalMarks(tm);
		setPageTitle(pt);
	}, [tm]);
	
	const values = assessmentMarks;
	let tMarks = totalMarks;
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		values[name] = {
			id: name,
			marksObt: value,
			type,
		};
		setAssessmentMarks({...values});
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(values);
		try {
			await updateGrades({values, totalMarks})
				.unwrap();
			navigate('/instructor/grades');
		} catch (e) {
			console.log(e);
		}
	};
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-bold text-gray-900">
						{section.title}
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						{section.course_title}
					</p>
					<h3 className="text-l font-bold leading-6 text-gray-900 mt-8 mb-4">
						{pageTitle}
					</h3>
				</div>
			</div>
			
			<div className="mb-4">
				<form>
					<TextInput label="Total Marks" type="number" value={totalMarks}
					           onChange={(e) => {
						           setTotalMarks(e.target.value);
					           }}/>
				</form>
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<h3 className="text-l font-bold leading-6 text-gray-900 mt-8 mb-4">
						Students
					</h3>
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
												Name
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Reg #
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Marks
											</th>
										</tr>
										</thead>
										<tbody className="bg-white">
										{data?.ids?.map(id => {
											return (
												<tr key={data?.entities[id]?.id}>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
														{data?.entities[id]?.student_name}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{data?.entities[id]?.session}-{data?.entities[id]?.program_title}-{data?.entities[id]?.reg_num}
													</td>
													<td className="whitespace-nowrap px-3 py-4">
														<input
															type="number"
															max={tMarks}
															min={0}
															name={data?.entities[id].id}
															required={true}
															value={dbGrades[id].marksObt}
															onChange={(e) => handleChange(e)}
															className="block rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600  sm:text-sm"
														/>
													</td>
												</tr>
											);
										})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-5">
					<div className="flex justify-end">
						<Link
							type="button"
							to="/instructor/grades"
							className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Cancel
						</Link>
						<button
							type="submit"
							className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default InstructorSectionGradesPage;
