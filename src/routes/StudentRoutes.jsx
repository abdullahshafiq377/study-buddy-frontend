import React from 'react';
import {Route, Routes} from 'react-router-dom';
import StudentDashboard from './../pages/student/StudentDashboard';
import NotFoundPage from './../pages/public/NotFoundPage';
import CourseRegistrationPage from "../pages/student/CourseRegistrationPage";

const StudentRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<StudentDashboard/>}/>
            <Route path='registration' element={<CourseRegistrationPage/>}/>

            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default StudentRoutes;
