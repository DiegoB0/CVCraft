import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

interface StepProps {
	step: {
		number: number;
		title: string;
	};
}

export default function Step({ step }: StepProps) {
	const { number, title } = step;
	const currentStep = useSelector(
		(store: RootState) => store.steps.currentStep
	);

	return (
		<div className="flex flex-col md:flex-row items-center justify-start">
			<div
				className={` mt-2 w-14 md:w-14 h-12 md:h-12 text-custom-light border border-base-800 rounded-full flex items-center justify-center font-bold bg-base-900 border-0' ${
					number === currentStep ? 'bg-emerald-600' : ''
				}`}
			>
				{number}
			</div>
			<div className="flex-col flex items-center w-full justify-end">
				<h2 className="text-slate-200 text-sm uppercase">Paso {number}</h2>
				<h1 className="uppercase text-base text-white font-bold">{title}</h1>
			</div>
		</div>
	);
}
