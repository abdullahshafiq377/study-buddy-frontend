import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
import SubAdminProfilePage from '../pages/sub-admin/SubAdminProfilePage';
import NotFoundPage from '../pages/public/NotFoundPage';
import SubAdminSettingsPage from '../pages/sub-admin/SubAdminSettingsPage';
import SectionsPage from '../pages/sub-admin/SectionsPage';
import SectionPage from '../pages/sub-admin/SectionPage';

const SubAdminRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<SubAdminDashboardPage/>}/>
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

            <Route path='sections' element={<SectionsPage/>}/>
            <Route path='sections/:sectionId' element={<SectionPage/>}/>

            <Route path='profile' element={<SubAdminProfilePage/>}/>
            <Route path='settings' element={<SubAdminSettingsPage/>}/>

            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default SubAdminRoutes;
