import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import SideBar from '../components/SideBar';

const Layout = () => {
	return (
		<div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 bg-base-800">
			<SideBar />
			<main className="bg-base-900 xl:col-span-5">
				<div className="px-8">
					<AdminHeader />
				</div>
				<div className="h-[90vh] overflow-y-scroll">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Layout;
