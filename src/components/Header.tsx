import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import Logo from './Logo';

function Header() {
	return (
		<nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
			<Logo />
			<div className="flex gap-4 items-center">
				<UserButton afterSignOutUrl="/"></UserButton>
			</div>
		</nav>
	);
}

export default Header;
