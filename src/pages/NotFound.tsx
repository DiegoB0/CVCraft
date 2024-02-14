import NavBar from '@/components/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen w-full flex-col items-center bg-base-800">
			<NavBar />
			<main className="flex flex-grow w-full justify-center bg-base-900 items-center ">
				<div className=" flex flex-col items-center justify-center mt-12">
					<h1 className="flex align-items-center justify-center text-8xl font-extrabold uppercase text-custom-mate text-shadow">
						404
					</h1>
					<h1 className="flex align-items-center justify-center text-3xl font-extrabold uppercase text-custom-mate mt-10">
						UPSS, ¿Te encuentras perdido?
					</h1>

					<div className="w-full mt-20 flex justify-center">
						<button
							className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-custom-light rounded-md group"
							onClick={() => navigate('/home')}
						>
							<span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-accent-green rounded-md group-hover:mt-0 group-hover:ml-0"></span>
							<span className="absolute inset-0 w-full h-full bg-custom-light rounded-md "></span>
							<span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-accent-green rounded-md opacity-0 group-hover:opacity-100 "></span>
							<span className="relative text-accent-green transition-colors duration-200 ease-in-out delay-100 group-hover:text-custom-light font-bold">
								REGRESAR AL INICIO
							</span>
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default NotFound;
