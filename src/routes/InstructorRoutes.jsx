import React from 'react';
import { Route, Routes } from 'react-router-dom';

import InstructorDashboard from './../pages/instructor/InstructorDashboard';

import NotFoundPage from './../pages/public/NotFoundPage';
import PostsPage from '../pages/multiple-users/PostsPage';
import UsersPostsPage from '../pages/multiple-users/UsersPostsPage';
import InstructorProfilePage from '../pages/instructor/InstructorProfilePage';
import InstructorSettingsPage from '../pages/instructor/InstructorSettingsPage';
import InstructorMeetingsPage from '../pages/instructor/InstructorMeetingsPage';
import ChatsPage from '../pages/multiple-users/ChatsPage';
import InMeetingPage from '../pages/multiple-users/InMeetingPage';
import InstructorAttendancePage from '../pages/instructor/InstructorAttendancePage';
import InstructorSectionAttendancePage from '../pages/instructor/InstructorSectionAttendancePage';
import InstructorMarkAttendancePage from '../pages/instructor/InstructorMarkAttendancePage';
import InstructorAssignmentsPage from '../pages/instructor/InstructorAssignmentsPage';
import InstructorSectionAssignmentsPage from '../pages/instructor/InstructorSectionAssignmentsPage';
import InstructorQuizzesPage from '../pages/instructor/InstructorQuizzesPage';
import InstructorSectionQuizzesPage from '../pages/instructor/InstructorSectionQuizzesPage';
import InstructorAssignmentSubmissionsPage from '../pages/instructor/InstructorAssignmentSubmissionsPage';
import InstructorQuizSubmissionsPage from '../pages/instructor/InstructorQuizSubmissionsPage';

const InstructorRoutes = () => {
	return (
		<Routes>
			<Route path="dashboard" element={<InstructorDashboard/>}/>
			<Route path="posts" element={<PostsPage/>}/>
			<Route path="my-posts" element={<UsersPostsPage/>}/>
			<Route path="chats" element={<ChatsPage/>}/>
			<Route path="meetings" element={<InstructorMeetingsPage/>}/>
			<Route path="meetings/in-meeting" element={<InMeetingPage/>}/>
			<Route path="attendance" element={<InstructorAttendancePage/>}/>
			<Route path="attendance/:sectionId" element={<InstructorSectionAttendancePage/>}/>
			<Route path="attendance/mark" element={<InstructorMarkAttendancePage/>}/>
			<Route path="assignments" element={<InstructorAssignmentsPage/>}/>
			<Route path="assignments/:sectionId" element={<InstructorSectionAssignmentsPage/>}/>
			<Route path="assignment/:assignmentId" element={<InstructorAssignmentSubmissionsPage/>}/>
			<Route path="quizzes" element={<InstructorQuizzesPage/>}/>
			<Route path="quizzes/:sectionId" element={<InstructorSectionQuizzesPage/>}/>
			<Route path="quiz/:quizId" element={<InstructorQuizSubmissionsPage/>}/>
			
			<Route path="profile" element={<InstructorProfilePage/>}/>
			<Route path="settings" element={<InstructorSettingsPage/>}/>
			
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
};

export default InstructorRoutes;
