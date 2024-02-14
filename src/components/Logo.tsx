import React from 'react';
import Docs from './icons/Docs';

function Logo() {
	return (
		<div className="flex gap-2 items-center">
			<h1 className="text-2xl font-bold bg-gradient-to-r from-accent-amber to-accent-yellow bg-clip-text text-transparent">
				CVCraft
			</h1>
			<Docs color="#059669" />
		</div>
	);
}

export default Logo;
