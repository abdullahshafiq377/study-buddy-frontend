import React from 'react';
import {Route, Routes} from 'react-router-dom';

import SubAdminDashboardPage from './../pages/sub-admin/SubAdminDashboardPage';
import InstructorsListPage from './../pages/sub-admin/InstructorsListPage';
import AddInstructorPage from './../pages/sub-admin/AddInstructorPage';
import EditInstructorPage from './../pages/sub-admin/EditInstructorPage';
import StudentsListPage from './../pages/sub-admin/StudentsListPage';
import AddStudentPage from './../pages/sub-admin/AddStudentPage';
import EditStudentPage from './../pages/sub-admin/EditStudentPage';
import CoursesListPage from './../pages/sub-admin/CoursesListPage';
import AddCoursePage from './../pages/sub-admin/AddCoursePage';
import EditCoursePage from './../pages/sub-admin/EditCoursePage';
import SubAdminProilePage from './../pages/sub-admin/SubAdminProilePage';
import NotFoundPage from '../pages/public/NotFoundPage';
import SubAdminSettingsPage from "../pages/sub-admin/SubAdminSettingsPage";

const SubAdminRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<SubAdminDashboardPage/>}/>
            <Route path='settings' element={<SubAdminSettingsPage/>}/>
            <Route path='instructors' element={<InstructorsListPage/>}/>
            <Route path='instructors/add' element={<AddInstructorPage/>}/>
            <Route
                path='instructors/edit/:instructorId'
                element={<EditInstructorPage/>}
            />

            <Route path='students' element={<StudentsListPage/>}/>
            <Route path='students/add' element={<AddStudentPage/>}/>
            <Route
                path='students/edit/:studentId'
                element={<EditStudentPage/>}
            />

            <Route path='courses' element={<CoursesListPage/>}/>
            <Route path='courses/add' element={<AddCoursePage/>}/>
            <Route path='courses/edit/:courseId' element={<EditCoursePage/>}/>
            <Route path='profile' element={<SubAdminProilePage/>}/>

            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default SubAdminRoutes;
