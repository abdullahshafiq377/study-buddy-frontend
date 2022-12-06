import React from 'react';
import LoginPage from './pages/public/LoginPage';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/public/NotFoundPage';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import RequireAuth from './features/auth/RequireAuth';
import AdminLayout from './components/AdminLayout';
import SubAdminLayout from './components/SubAdminLayout';
import AddSubAdminPage from './pages/admin/AddSubAdminPage';
import EditSubAdminPage from './pages/admin/EditSubAdminPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import SubAdminsListPage from './pages/admin/SubAdminsListPage';
import DepartmentsListPage from './pages/admin/DepartmentsListPage';
import ProgramsListPage from './pages/admin/ProgramsListPage';
import NoticesListPage from './pages/admin/NoticesListPage';
import EventsListPage from './pages/admin/EventsListPage';
import SubAdminDashboardPage from './pages/sub-admin/SubAdminDashboardPage';
import InstructorsListPage from './pages/sub-admin/InstructorsListPage';
import StudentsListPage from './pages/sub-admin/StudentsListPage';
import CoursesListPage from './pages/sub-admin/CoursesListPage';
import AddDepartmentPage from './pages/admin/AddDepartmentPage';
import EditDepartmentPage from './pages/admin/EditDepartmentPage';
import AddProgramPage from './pages/admin/AddProgramPage';
import EditProgramPage from './pages/admin/EditProgramPage';
import EditNoticePage from './pages/admin/EditNoticePage';
import AddNoticePage from './pages/admin/AddNoticePage';
import AddEventPage from './pages/admin/AddEventPage';
import EditEventPage from './pages/admin/EditEventPage';
import AddInstructorPage from './pages/sub-admin/AddInstructorPage';
import EditInstructorPage from './pages/sub-admin/EditInstructorPage';
import AddStudentPage from './pages/sub-admin/AddStudentPage';
import EditStudentPage from './pages/sub-admin/EditStudentPage';
import AddCoursePage from './pages/sub-admin/AddCoursePage';
import EditCoursePage from './pages/sub-admin/EditCoursePage';

function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path='/'>
				<Route index element={<LoginPage />} />

				{/* Private Routes */}
				{/* <Route element={<RequireAuth />}>*/}
				<Route element={<AdminLayout />}>
					<Route path='admin'>
						<Route
							path='dashboard'
							element={<AdminDashboardPage />}
						/>
						<Route
							path='sub-admins'
							element={<SubAdminsListPage />}
						/>
						<Route
							path='sub-admins/add'
							element={<AddSubAdminPage />}
						/>
						<Route
							path='sub-admins/edit/:subAdminId'
							element={<EditSubAdminPage />}
						/>

						<Route
							path='departments'
							element={<DepartmentsListPage />}
						/>
						<Route
							path='departments/add'
							element={<AddDepartmentPage />}
						/>
						<Route
							path='departments/edit/:departmentId'
							element={<EditDepartmentPage />}
						/>

						<Route path='programs' element={<ProgramsListPage />} />
						<Route
							path='programs/add'
							element={<AddProgramPage />}
						/>
						<Route
							path='programs/edit/:programId'
							element={<EditProgramPage />}
						/>

						<Route path='notices' element={<NoticesListPage />} />
						<Route path='notices/add' element={<AddNoticePage />} />
						<Route
							path='notices/edit/:noticeId'
							element={<EditNoticePage />}
						/>

						<Route path='events' element={<EventsListPage />} />
						<Route path='events/add' element={<AddEventPage />} />
						<Route
							path='events/edit/:eventId'
							element={<EditEventPage />}
						/>
					</Route>
				</Route>

				<Route element={<SubAdminLayout />}>
					<Route path='sub-admin'>
						<Route
							path='dashboard'
							element={<SubAdminDashboardPage />}
						/>
						<Route
							path='instructors'
							element={<InstructorsListPage />}
						/>
						<Route
							path='instructors/add'
							element={<AddInstructorPage />}
						/>
						<Route
							path='instructors/edit/:instructorId'
							element={<EditInstructorPage />}
						/>

						<Route path='students' element={<StudentsListPage />} />
						<Route path='students/add' element={<AddStudentPage />} />
						<Route
							path='students/edit/:studentId'
							element={<EditStudentPage />}
						/>

						<Route path='courses' element={<CoursesListPage />} />
						<Route path='courses/add' element={<AddCoursePage />} />
						<Route
							path='courses/edit/:courseId'
							element={<EditCoursePage />}
						/>
					</Route>
				</Route>

				<Route path='instructor'>
					<Route path='dashboard' element={<InstructorDashboard />} />
				</Route>
				<Route path='student'>
					<Route path='dashboard' element={<StudentDashboard />} />
				</Route>

				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
