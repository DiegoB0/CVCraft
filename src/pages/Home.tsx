import ResumeIcon from '@/components/icons/Resume';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();

	return (
		<div>
			<div className="w-2/3 mx-auto">
				<h1 className="font-bold text-stone-200 text-4xl text-center">
					Solo el{' '}
					<span className="font-extrabold text-yellow-500 text-4xl">
						5% de los CV{' '}
					</span>{' '}
					llegan a la siguiente fase. Sé parte de ese 5% con{' '}
					<span className="font-extrabold text-yellow-500">CVCraft</span>
				</h1>
			</div>

			<div className="flex mt-10 w-2/3 mx-auto">
				{/* Text Container */}
				<div>
					<div className="basis-1/4 mt-10 ">
						<h1 className="font-bold text-stone-300 text-2xl">
							Crea, mejora y administra tus curriculums de forma profesional.
						</h1>
					</div>

					{/* Button container */}
					<div className="w-full mt-20 flex justify-center">
						<button
							className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-stone-200 bg-gray-800 rounded-md group"
							onClick={() => navigate('/sign-in')}
						>
							<span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-emerald-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
							<span className="absolute inset-0 w-full h-full bg-stone-200 rounded-md "></span>
							<span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-emerald-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
							<span className="relative text-emerald-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white font-bold">
								CREAR MI CURRICULUM
							</span>
						</button>
					</div>
				</div>
				<div className="flex justify-center mb-8 basis-3/4">
					<ResumeIcon />
				</div>
			</div>
		</div>
	);
}

export default Home;
