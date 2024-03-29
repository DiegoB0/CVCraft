import ResumeIcon from '@/components/icons/Resume';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'react-ts-typewriter';

function Welcome() {
	const navigate = useNavigate();
	const [showTitle, setShowTitle] = useState(false);

	useEffect(() => {
		setShowTitle(true);
	}, []);

	useEffect(() => {
		if (showTitle) {
			const tl = gsap.timeline();

			tl.from('#animatedTitle', {
				opacity: 0,
				duration: 1.5,
				ease: 'power2.inOut',
			}).from(
				'.resume-icon',
				{ opacity: 0, y: '100vh', duration: 0.3, ease: 'power2.out' },
				'-=0.3'
			);
		}
	}, [showTitle]);

	return (
		<div>
			<div className="w-2/3 mx-auto">
				<h1
					className="font-bold text-custom-light text-4xl text-center"
					id="animatedTitle"
				>
					Solo el{' '}
					<span className="font-extrabold text-accent-yellow text-4xl">
						5% de los CV{' '}
					</span>{' '}
					llegan a la siguiente fase. Sé parte de ese 5% con{' '}
					<span className="font-extrabold text-accent-yellow">CVCraft</span>
				</h1>
			</div>

			<div className="flex mt-10 w-2/3 m-auto">
				{/* Text Container */}
				<div className="w-1/2 h-300">
					<div className="mt-10">
						<h1 className="font-bold text-custom-gray text-2xl h-20">
							<Typewriter text="Crea, mejora y administra tus curriculums de forma profesional." />
						</h1>
					</div>

					{/* Button container */}
					<div className="w-full mt-20 flex justify-center">
						<div className="w-64">
							<button
								className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-custom-light rounded-md group"
								onClick={() => navigate('/sign-in')}
							>
								<span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-accent-green rounded-md group-hover:mt-0 group-hover:ml-0"></span>
								<span className="absolute inset-0 w-full h-full bg-custom-light rounded-md "></span>
								<span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-accent-green rounded-md opacity-0 group-hover:opacity-100 "></span>
								<span className="relative text-accent-green transition-colors duration-200 ease-in-out delay-100 group-hover:text-custom-light font-bold">
									CREAR MI CURRICULUM
								</span>
							</button>
						</div>
					</div>
				</div>
				<div className="xl:flex lg:flex md:flex justify-center w-1/2 mb-8 basis-3/4 hidden resume-icon">
					<ResumeIcon />
				</div>
			</div>
		</div>
	);
}

export default Welcome;
