import { UserButton } from '@clerk/clerk-react';
import React from 'react';

function AdminHeader() {
	return (
		<header className="md:h-[10vh] h-[7vh] border-b border-base-800 flex w-full items-center justify-between md:py-8 py-6 px-2">
			<h1 className="font-extrabold"> DASHBOARD</h1>
			<div className="xl:flex gap-4 items-center hidden">
				<UserButton afterSignOutUrl="/"></UserButton>
			</div>
		</header>
	);
}

export default AdminHeader;
