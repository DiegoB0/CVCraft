import React from 'react';
import Step from './Step';

interface StepProps {
	steps: {
		number: number;
		title: string;
	}[];
}

function Steps({ steps }: StepProps) {
	return (
		<div className="rounded-lg col-span-full md:col-span-4 bg-base-900 border border-base-800 py-8 px-6 flex flex-row justify-between md:flex-col md:justify-start gap-4 flex-wrap ">
			{steps.map((step, i) => {
				return <Step key={i} step={step} />;
			})}
		</div>
	);
}

export default Steps;
