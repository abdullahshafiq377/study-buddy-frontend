import React from 'react';
import {Route, Routes} from 'react-router-dom';
import StudentDashboard from './../pages/student/StudentDashboard';
import NotFoundPage from './../pages/public/NotFoundPage';
import CourseRegistrationPage from "../pages/student/CourseRegistrationPage";
import PostsPage from "../pages/all-users/PostsPage";
import UsersPostsPage from "../pages/all-users/UsersPostsPage";

const StudentRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<StudentDashboard/>}/>
            <Route path='registration' element={<CourseRegistrationPage/>}/>
            <Route path='posts' element={<PostsPage/>}/>
            <Route path='my-posts' element={<UsersPostsPage/>}/>

            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default StudentRoutes;
