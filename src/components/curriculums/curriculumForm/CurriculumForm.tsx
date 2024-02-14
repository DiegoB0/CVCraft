import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import AboutMe from './modules/AboutMe';
import Certificate from './modules/Certificate';
import Education from './modules/Education';
import Experience from './modules/Experience';
import Language from './modules/Language';
import OtherSkills from './modules/OtherSkills';

function CurriculumForm() {
	const currentStep = useSelector(
		(store: RootState) => store.steps.currentStep
	);
	function renderFormByStep(step: number) {
		if (step === 1) {
			return <AboutMe />;
		} else if (step === 2) {
			return <Education />;
		} else if (step === 3) {
			return <Certificate />;
		} else if (step === 4) {
			return <Experience />;
		} else if (step === 5) {
			return <Language />;
		} else if (step === 6) {
			return <OtherSkills />;
		}
	}
	return <div className="h-full">{renderFormByStep(currentStep)}</div>;
}

export default CurriculumForm;
