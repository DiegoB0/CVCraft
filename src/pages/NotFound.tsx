import NavBar from '@/components/NavBar';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen w-full flex-col items-center bg-base-800">
			<NavBar />
			<main className="flex flex-grow w-full justify-center bg-base-900 items-center ">
				<div className=" flex flex-col items-center justify-center mt-12">
					<h1 className="flex align-items-center justify-center text-8xl font-extrabold uppercase text-stone-200">
						404
					</h1>
					<h1 className="flex align-items-center justify-center text-3xl font-extrabold uppercase text-stone-200 mt-10">
						UPSS, ¿Te encuentras perdido?
					</h1>

					<div className="mt-20">
						<button
							className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-amber-500 rounded-xl group"
							onClick={() => navigate('/curriculums')}
						>
							<span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-yellow-700 rounded group-hover:-mr-4 group-hover:-mt-4">
								<span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-stone-200"></span>
							</span>
							<span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-yellow-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
							<span className="relative w-full text-left text-stone-200 transition-colors duration-200 ease-in-out group-hover:text-white font-bold">
								Regresar al Inicio
							</span>
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default NotFound;
