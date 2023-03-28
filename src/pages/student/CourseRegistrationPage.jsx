import React from 'react';
import UnregisteredCoursesTable from "../../features/registration/components/UnregisteredCoursesTable";
import RegisteredCoursesTable from "../../features/registration/components/RegisteredCoursesTable";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentUserId} from "../../features/auth/authSlice";

const CourseRegistrationPage = () => {
    const studentId = useSelector(selectCurrentUserId);

    return (<div className='px-4 sm:px-6 lg:px-8'>
            <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Course Registration
                    </h1>
                    <p className='mt-2 text-sm text-gray-700'>
                        Course Registration Page {/*TODO: change placeholder text*/}
                    </p>
                </div>

                <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none' hidden={true}>
                    <Link
                        to=''
                        className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto'
                    >
                        Registration Card
                    </Link>
                </div>
            </div>

            <div>
                <h3 className='text-l font-bold leading-6 text-gray-900 mt-8'>
                    Registered Courses
                </h3>
                <RegisteredCoursesTable studentId={studentId}/>
            </div>
            <div>
                <h3 className='text-l font-bold leading-6 text-gray-900 mt-8'>
                    Unregistered Courses
                </h3>
                <UnregisteredCoursesTable studentId={studentId}/>
            </div>
        </div>
    );
};

export default CourseRegistrationPage;

