import Steps from '@/components/curriculums/Steps';
import CurriculumForm from '@/components/curriculums/curriculumForm/CurriculumForm';
import React from 'react';

function CurriculumsNew() {
	const steps = [
		{
			number: 1,
			title: 'Personal Info',
		},
		{
			number: 2,
			title: 'Educacion',
		},
		{
			number: 3,
			title: 'Certificaciones',
		},
		{
			number: 4,
			title: 'Experiencia',
		},
		{
			number: 5,
			title: 'Idiomas',
		},
		{
			number: 6,
			title: 'Otras habilidades',
		},
	];
	return (
		<div className="p-4">
			<div className="mx-auto w-full max-w-5xl p-4 bg-base-900 shadow sm:p-4 md:p-6 grid grid-cols-12 gap-2">
				{/* Steps */}
				<Steps steps={steps} />
				<div className="rounded-lg col-span-full md:col-span-8">
					<CurriculumForm />
				</div>
			</div>
		</div>
	);
}

export default CurriculumsNew;
