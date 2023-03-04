import {Outlet} from 'react-router-dom';
import StudentSideNav from "./StudentSideNav";

const StudentLayout = () => {
    return (
        <>
            <StudentSideNav>
                <Outlet/>
            </StudentSideNav>
        </>
    );
};

export default StudentLayout;
