import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	currentStep: 1,
	personalInfo: {},
	shippingInfo: {},
	combinedData: {},
};

const stepSlice = createSlice({
	name: 'steps',
	initialState,
	reducers: {
		setCurrentStep: (state, action) => {
			state.currentStep = action.payload;
		},
		updatePersonalInfo: (state, action) => {
			state.personalInfo = { ...state.personalInfo, ...action.payload };
			state.combinedData = {
				...state.combinedData,
				...action.payload,
			};
		},
		updateShippingInfo: (state, action) => {
			state.shippingInfo = { ...state.shippingInfo, ...action.payload };
			state.combinedData = {
				...state.combinedData,
				...action.payload,
			};
		},
		updateCombinedData: (state, action) => {
			state.combinedData = {
				...state.personalInfo,
				...state.shippingInfo,
				...action.payload,
			};
		},
	},
});

export const {
	setCurrentStep,
	updatePersonalInfo,
	updateShippingInfo,
	updateCombinedData,
} = stepSlice.actions;
export default stepSlice.reducer;
