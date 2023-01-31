import React from 'react';
import {Route, Routes} from 'react-router-dom';

import InstructorDashboard from './../pages/instructor/InstructorDashboard';

import NotFoundPage from './../pages/public/NotFoundPage';

const InstructorRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<InstructorDashboard/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default InstructorRoutes;
