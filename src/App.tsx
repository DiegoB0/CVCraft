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
import Board from './pages/Board';
import Email from './pages/Email';
import ExcelSheets from './pages/ExcelSheets';
import ExcelSheetsNew from './pages/ExcelSheetsNew';
import Teams from './pages/Team';

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
			<Route path="/excelsheets" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<ExcelSheets />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Route>
			<Route path="/excelsheets/new" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<ExcelSheetsNew />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Route>
			<Route path="/team" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<Teams />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Route>

			<Route path="/board/:id" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<Board />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Route>

			<Route path="/email" element={<Layout />}>
				<Route
					index
					element={
						<>
							<SignedIn>
								<Email />
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
