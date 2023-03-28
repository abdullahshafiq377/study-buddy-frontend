import React from 'react';
import {Route, Routes} from 'react-router-dom';

import InstructorDashboard from './../pages/instructor/InstructorDashboard';

import NotFoundPage from './../pages/public/NotFoundPage';
import PostsPage from "../pages/all-users/PostsPage";
import UsersPostsPage from "../pages/all-users/UsersPostsPage";
import InstructorProfilePage from "../pages/instructor/InstructorProfilePage";
import InstructorSettingsPage from "../pages/instructor/InstructorSettingsPage";

const InstructorRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<InstructorDashboard/>}/>
            <Route path='posts' element={<PostsPage/>}/>
            <Route path='my-posts' element={<UsersPostsPage/>}/>


            <Route path='profile' element={<InstructorProfilePage/>}/>
            <Route path='settings' element={<InstructorSettingsPage/>}/>

            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default InstructorRoutes;
