import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';

const Layout = () => {
	return (
		<div className="min-h-screen grid grid-cols-6">
			<SideBar />
			<main className="bg-black xl:col-span-5 ">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
