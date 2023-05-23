import React from 'react';
import { useParams } from 'react-router-dom';
import StudentAssignmentGradesTable from '../../features/grades/components/StudentAssignmentGradesTable';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetGradesByStudentQuery } from '../../features/grades/gradesApiSlice';
import StudentQuizzesGradesTable from '../../features/grades/components/StudentQuizzesGradesTable';
import StudentMidGradesTable from '../../features/grades/components/StudentMidGradesTable';
import StudentTerminalGradesTable from '../../features/grades/components/StudentTerminalGradesTable';

const StudentSectionGradesPage = () => {
	const {sectionId} = useParams();
	const userId = useSelector(selectCurrentUserId);
	
	const {isLoading, isSuccess, isError, data} = useGetGradesByStudentQuery(userId);
	console.log(data);
	
	let grades = [];
	let grade;
	
	if (isSuccess) {
		data.ids.map(id => {
			grades.push(data.entities[id]);
		});
		
		if (grades.length) {
			grade = grades.filter(obj => {
				                      return obj.section_id === sectionId;
			                      }
			);
			grade = grade[0];
			console.log(grade);
		}
	}
	
	
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							Grades
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the sub admins in the system including
							their names, emails, genders and contact numbers.
						</p>
					</div>
				</div>
				<div className="mt-12">
					<StudentAssignmentGradesTable grade={grade}/>
				</div>
				<div className="mt-12">
					<StudentQuizzesGradesTable grade={grade}/>
				</div>
				<div className="mt-12">
					<StudentMidGradesTable grade={grade}/>
				</div>
				<div className="mt-12">
					<StudentTerminalGradesTable grade={grade}/>
				</div>
			</div>
		</>
	);
};

export default StudentSectionGradesPage;
