import { configureStore } from '@reduxjs/toolkit';
import stepSlice from './features/stepSlice';

export const store = configureStore({
	reducer: {
		steps: stepSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
