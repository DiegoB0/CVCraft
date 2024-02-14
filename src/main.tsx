import App from '@/App.tsx';
import '@/index.css';
import { store } from '@/store';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
	throw new Error('Missing Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
	<React.StrictMode>
		<ClerkProvider
			publishableKey={CLERK_KEY}
			appearance={{
				baseTheme: dark,
				variables: {
					colorPrimary: '#f59e0b',
				},
			}}
		>
			<BrowserRouter>
				<Provider store={store}>
					<App />
					<ToastContainer />
				</Provider>
			</BrowserRouter>
		</ClerkProvider>
	</React.StrictMode>
);
