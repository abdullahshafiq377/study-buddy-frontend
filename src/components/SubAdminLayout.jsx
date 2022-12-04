import { Outlet } from 'react-router-dom';
import SubAdminSideNav from './SubAdminSideNav';

const SubAdminLayout = () => {
	return (
		<>
			<SubAdminSideNav>
				<Outlet />
			</SubAdminSideNav>
		</>
	);
};

export default SubAdminLayout;
