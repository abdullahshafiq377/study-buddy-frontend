import {Outlet} from 'react-router-dom';
import InstructorSideNav from "./InstructorSideNav";

const InstructorLayout = () => {
    return (
        <>
            <InstructorSideNav>
                <Outlet/>
            </InstructorSideNav>
        </>
    );
};

export default InstructorLayout;
