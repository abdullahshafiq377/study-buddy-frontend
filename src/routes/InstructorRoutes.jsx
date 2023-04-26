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

const InstructorRoutes = () => {
	return (
		<Routes>
			<Route path="dashboard" element={<InstructorDashboard/>}/>
			<Route path="posts" element={<PostsPage/>}/>
			<Route path="my-posts" element={<UsersPostsPage/>}/>
			<Route path="chats" element={<ChatsPage/>}/>
			<Route path="meetings" element={<InstructorMeetingsPage/>}/>
			<Route path="meetings/in-meeting" element={<InMeetingPage/>}/>
			
			
			<Route path="profile" element={<InstructorProfilePage/>}/>
			<Route path="settings" element={<InstructorSettingsPage/>}/>
			
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
};

export default InstructorRoutes;
