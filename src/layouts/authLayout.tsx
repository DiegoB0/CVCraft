import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AuthLayout = () => {
	return (
		<div className="flex min-h-screen w-full flex-col items-center bg-base-800">
			<Header />
			<main className="flex flex-grow w-full justify-center bg-base-900 items-center ">
				<Outlet />
			</main>
		</div>
	);
};

export default AuthLayout;
