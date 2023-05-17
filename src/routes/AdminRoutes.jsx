import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminDashboardPage from './../pages/admin/AdminDashboardPage';
import SubAdminsListPage from './../pages/admin/SubAdminsListPage';
import AddSubAdminPage from './../pages/admin/AddSubAdminPage';
import EditSubAdminPage from './../pages/admin/EditSubAdminPage';
import DepartmentsListPage from './../pages/admin/DepartmentsListPage';
import AddDepartmentPage from './../pages/admin/AddDepartmentPage';
import EditDepartmentPage from './../pages/admin/EditDepartmentPage';
import ProgramsListPage from './../pages/admin/ProgramsListPage';
import AddProgramPage from './../pages/admin/AddProgramPage';
import EditProgramPage from './../pages/admin/EditProgramPage';
import NoticesListPage from './../pages/admin/NoticesListPage';
import AddNoticePage from './../pages/admin/AddNoticePage';
import EditNoticePage from './../pages/admin/EditNoticePage';
import EventsListPage from './../pages/admin/EventsListPage';
import AddEventPage from './../pages/admin/AddEventPage';
import EditEventPage from './../pages/admin/EditEventPage';
import NotFoundPage from './../pages/public/NotFoundPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import ResetPasswordPage from '../pages/admin/ResetPasswordPage';
import AdminPostsPage from '../pages/admin/AdminPostsPage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<AdminDashboardPage/>}/>
            <Route path='settings' element={<AdminSettingsPage/>}/>

            <Route path='sub-admins' element={<SubAdminsListPage/>}/>
            <Route path='sub-admins/add' element={<AddSubAdminPage/>}/>
            <Route
                path='sub-admins/edit/:subAdminId'
                element={<EditSubAdminPage/>}
            />

            <Route path='departments' element={<DepartmentsListPage/>}/>
            <Route path='departments/add' element={<AddDepartmentPage/>}/>
            <Route
                path='departments/edit/:departmentId'
                element={<EditDepartmentPage/>}
            />

            <Route path='programs' element={<ProgramsListPage/>}/>
            <Route path='programs/add' element={<AddProgramPage/>}/>
            <Route
                path='programs/edit/:programId'
                element={<EditProgramPage/>}
            />

            <Route path='notices' element={<NoticesListPage/>}/>
            <Route path='notices/add' element={<AddNoticePage/>}/>
            <Route path='notices/edit/:noticeId' element={<EditNoticePage/>}/>

            <Route path='events' element={<EventsListPage/>}/>
            <Route path='events/add' element={<AddEventPage/>}/>
            <Route path='events/edit/:eventId' element={<EditEventPage/>}/>

            <Route path='posts' element={<AdminPostsPage/>}/>

            <Route path='reset-password' element={<ResetPasswordPage/>}/>


            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AdminRoutes;
