import React from 'react';
import LoginPage from './pages/public/LoginPage';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './pages/public/NotFoundPage';
import AdminLayout from './components/AdminLayout';
import SubAdminLayout from './components/SubAdminLayout';
import AdminRoutes from './routes/AdminRoutes';
import SubAdminRoutes from './routes/SubAdminRoutes';
import InstructorRoutes from './routes/InstructorRoutes';
import StudentRoutes from './routes/StudentRoutes';
import StudentLayout from "./components/StudentLayout";

function App() {
    return (<Routes>
            {/* Public Routes */}
            <Route path='/'>
                <Route index element={<LoginPage/>}/>

                {/* Private Routes */}
                {/* <Route element={<RequireAuth />}>*/}

                {/* Admin Routes */}
                <Route element={<AdminLayout/>}>
                    <Route path='admin/*' element={<AdminRoutes/>}/>
                </Route>

                {/* Sub Admin Routes */}
                <Route element={<SubAdminLayout/>}>
                    <Route path='sub-admin/*' element={<SubAdminRoutes/>}/>
                </Route>

                {/* Instructor Routes */}
                <Route path='instructor/*' element={<InstructorRoutes/>}/>

                {/* Student Routes */}
                <Route element={<StudentLayout/>}>
                    <Route path='student/*' element={<StudentRoutes/>}/>
                </Route>

                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
