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
import StudentAssignmentPage from '../pages/student/StudentAssignmentsPage';
import StudentQuizzesPage from '../pages/student/StudentQuizzesPage';
import StudentAssignmentsPage from '../pages/student/StudentAssignmentsPage';

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
			<Route path="quizzes" element={<StudentQuizzesPage/>}/>
			
			
			<Route path="profile" element={<StudentProfilePage/>}/>
			<Route path="settings" element={<StudentSettingsPage/>}/>
			<Route path="my-posts" element={<UsersPostsPage/>}/>
			
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
};

export default StudentRoutes;
