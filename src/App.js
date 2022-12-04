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

						<Route path='programs' element={<ProgramsListPage />} />
						<Route path='notices' element={<NoticesListPage />} />
						<Route path='events' element={<EventsListPage />} />
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
						<Route path='students' element={<StudentsListPage />} />
						<Route path='courses' element={<CoursesListPage />} />
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
