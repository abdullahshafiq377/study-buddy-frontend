import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAssignedStudentsQuery, useGetSectionByIdQuery } from '../../features/sections/sectionsApiSlice';
import AssessmentGradesTable from '../../features/grades/components/AssessmentGradesTable';
import { useGetGradesBySectionQuery } from '../../features/grades/gradesApiSlice';
import ExcelFile from 'react-export-excel/dist/ExcelPlugin/components/ExcelFile';
import ExcelSheet from 'react-export-excel/dist/ExcelPlugin/elements/ExcelSheet';
import ExcelColumn from 'react-export-excel/dist/ExcelPlugin/elements/ExcelColumn';

const InstructorSectionAssessmentsPage = () => {
	const {sectionId} = useParams();
	
	const {isLoading, isSuccess, isError, data} = useGetGradesBySectionQuery(sectionId);
	
	
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
	let dbGrades = [];
	if (isSuccess) {
		
		data.ids.map(id => {
			dbGrades.push(data.entities[id]);
		});
		console.log(dbGrades);
	}
	
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
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<ExcelFile element={<button
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
					>
						Generate Grades Report
					</button>}>
						<ExcelSheet data={dbGrades} name="Grades">
							<ExcelColumn label="Name" value="student_name"/>
							<ExcelColumn label="Assignment 1" value="a1_obt"/>
							<ExcelColumn label="Assignment 2" value="a2_obt"/>
							<ExcelColumn label="Assignment 3" value="a3_obt"/>
							<ExcelColumn label="Assignment 4" value="a4_obt"/>
							<ExcelColumn label="Quiz 1" value="q1_obt"/>
							<ExcelColumn label="Quiz 2" value="q2_obt"/>
							<ExcelColumn label="Quiz 3" value="q3_obt"/>
							<ExcelColumn label="Quiz 4" value="q4_obt"/>
							<ExcelColumn label="Mid-Term" value="mid_obt"/>
							<ExcelColumn label="Terminal" value="terminal_obt"/>
						</ExcelSheet>
					</ExcelFile>
				
				
				</div>
			</div>
			
			<div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4">
				<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
					<dl className="sm:divide-y sm:divide-gray-200">
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Semester
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{section.semester}
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Instructor
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{section.instructor_name}
							</dd>
						</div>
						<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Strength
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{section.strength}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<div>
				<h3 className="text-l font-bold leading-6 text-gray-900 mt-8 mb-4">
					Assessments
				</h3>
				<AssessmentGradesTable sectionId={sectionId}/>
				{/*<InstructorStudentGradesTable sectionId={sectionId}/>*/}
			</div>
		</div>
	);
};

export default InstructorSectionAssessmentsPage;
