import { Outlet } from 'react-router-dom';
import AdminSideNav from './AdminSideNav';

const AdminLayout = () => {
	return (
		<>
			<AdminSideNav>
				<Outlet />
			</AdminSideNav>
		</>
	);
};

export default AdminLayout;
