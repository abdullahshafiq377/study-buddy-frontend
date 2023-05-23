import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentDashboard from './../pages/student/StudentDashboard';
import NotFoundPage from './../pages/public/NotFoundPage';
import CourseRegistrationPage from '../pages/student/CourseRegistrationPage';
import PostsPage from '../pages/multiple-users/PostsPage';
import UsersPostsPage from '../pages/multiple-users/UsersPostsPage';
import StudentProfilePage from '../pages/student/StudentProfilePage';
import StudentSettingsPage from '../pages/student/StudentSettingsPage';
import ChatsPage from '../pages/multiple-users/ChatsPage';
import StudentMeetingsPage from '../pages/student/StudentMeetingsPage';
import InMeetingPage from '../pages/multiple-users/InMeetingPage';
import StudentQuizzesPage from '../pages/student/StudentQuizzesPage';
import StudentAssignmentsPage from '../pages/student/StudentAssignmentsPage';
import UserNoticesPage from '../pages/multiple-users/UserNoticesPage';
import UserEventsPage from '../pages/multiple-users/UserEventsPage';
import StudentAttendancePage from '../pages/student/StudentAttendancePage';
import StudentAttendanceBySectionPage from '../pages/student/StudentAttendanceBySectionPage';
import StudentLearningResourcesPage from '../pages/student/StudentLearningResourcesPage';
import StudentSectionLearningResourcePage from '../pages/student/StudentSectionLearningResourcePage';
import StudentGradesPage from '../pages/student/StudentGradesPage';
import StudentSectionGradesPage from '../pages/student/StudentSectionGradesPage';
import StudentResultsPage from '../pages/student/StudentResultsPage';

const StudentRoutes = () => {
	return (
		<Routes>
			<Route path="dashboard" element={<StudentDashboard/>}/>
			
			<Route path="registration" element={<CourseRegistrationPage/>}/>
			
			<Route path="posts" element={<PostsPage/>}/>
			
			<Route path="chats" element={<ChatsPage/>}/>
			
			<Route path="meetings" element={<StudentMeetingsPage/>}/>
			<Route path="meetings/in-meeting" element={<InMeetingPage/>}/>
			
			<Route path="assignments" element={<StudentAssignmentsPage/>}/>
			
			<Route path="attendance" element={<StudentAttendancePage/>}/>
			<Route path="attendance/:sectionId" element={<StudentAttendanceBySectionPage/>}/>
			
			<Route path="quizzes" element={<StudentQuizzesPage/>}/>
			
			<Route path="notices" element={<UserNoticesPage/>}/>
			
			<Route path="events" element={<UserEventsPage/>}/>
			
			<Route path="learning-resources" element={<StudentLearningResourcesPage/>}/>
			<Route path="learning-resources/:sectionId" element={<StudentSectionLearningResourcePage/>}/>
			
			<Route path="grades" element={<StudentGradesPage/>}/>
			<Route path="grades/:sectionId" element={<StudentSectionGradesPage/>}/>
			
			<Route path="results" element={<StudentResultsPage/>}/>
			
			<Route path="profile" element={<StudentProfilePage/>}/>
			<Route path="settings" element={<StudentSettingsPage/>}/>
			<Route path="my-posts" element={<UsersPostsPage/>}/>
			
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
};

export default StudentRoutes;
