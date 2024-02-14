import Layout from '@/layouts/Layout';
import AuthLayout from '@/layouts/authLayout';
import Curriculums from '@/pages/Curriculums';
import CurriculumsNew from '@/pages/CurriculumsNew';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';
import {
	RedirectToSignIn,
	SignIn,
	SignUp,
	SignedIn,
	SignedOut,
} from '@clerk/clerk-react';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route index element={<Welcome />} />
			</Route>
			<Route path="/sign-in/*" element={<AuthLayout />}>
				<Route
					index
					element={
						<SignIn
							routing="path"
							path="/sign-in"
							redirectUrl={'/home'}
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
							redirectUrl={'/home'}
						></SignUp>
					}
				/>
			</Route>
			<Route path="/home" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<Home />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
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
			<Route path="/curriculums/new" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<CurriculumsNew />
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
