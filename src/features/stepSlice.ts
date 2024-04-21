import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	currentStep: 1,
	formData: {},
	aboutMeForm: {},
	educationForm: {},
	experienceForm: {},
	certificateForm: {},
	otherSkillsForm: {},
	languageForm: {},
};

const stepSlice = createSlice({
	name: 'steps',
	initialState,
	reducers: {
		setCurrentStep: (state, action) => {
			state.currentStep = action.payload;
		},
		updateFormData: (state, action) => {
			state.formData = {
				...state.formData,
				...action.payload,
			};
		},
		updateAboutMeForm: (state, action) => {
			state.aboutMeForm = {
				...state.aboutMeForm,
				...action.payload,
			};
		},
	},
});

export const { setCurrentStep, updateFormData } = stepSlice.actions;
export default stepSlice.reducer;
