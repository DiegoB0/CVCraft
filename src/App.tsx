import {
	RedirectToSignIn,
	SignIn,
	SignUp,
	SignedIn,
	SignedOut,
} from '@clerk/clerk-react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import AuthLayout from './components/layouts/authLayout';
import Curriculums from './pages/Curriculums';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route index element={<Home />} />
			</Route>
			<Route path="/sign-in/*" element={<AuthLayout />}>
				<Route
					index
					element={
						<SignIn
							routing="path"
							path="/sign-in"
							redirectUrl={'/curriculums'}
						></SignIn>
					}
				/>
			</Route>
			<Route path="/sign-up/*" element={<AuthLayout />}>
				<Route
					index
					element={
						<SignUp
							routing="path"
							path="/sign-up"
							redirectUrl={'/curriculums'}
						></SignUp>
					}
				/>
			</Route>
			<Route path="/curriculums" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<Curriculums />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
