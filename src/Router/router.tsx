import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Suspense, lazy } from 'react';
import { NotFound } from '../Pages/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const HomeFeed = lazy(() => import('../Pages/HomeFeed/HomeFeed'));
const BookDetail = lazy(() => import('../Pages/BookDetail/BookDetail'));
const Profile = lazy(() => import('../Pages/Profile/Profile'));
const ProfileEdit = lazy(() => import('../Pages/Profile/ProfileEdit'));
const MainLayout = lazy(() => import('../Layouts/Main/MainLayout'));
const Loading = lazy(() => import('../Components/LoadingSpinner/Loading'));
const SignIn = lazy(() => import('../Pages/LoginSignup/SignIn'));
const SignUp = lazy(() => import('../Pages/LoginSignup/SignUp'));
const Search = lazy(() => import('../Pages/Search/Search'));

export default function Router() {
	const { user, isAuthReady } = useSelector((state: RootState) => state.user);

	return (
		<BrowserRouter basename='/'>
			<Suspense fallback={<Loading BackDrop={true} />}>
				{isAuthReady ? (
					<Routes>
						<Route element={<MainLayout />}>
							<Route
								path='/signup'
								element={
									!user ? <SignUp /> : <Navigate replace={true} to='/' />
								}
							/>
							<Route
								path='/login'
								element={
									!user ? <SignIn /> : <Navigate replace={true} to='/' />
								}
							/>
							<Route path='/' element={<HomeFeed />} />

							<Route path='/search/'>
								<Route path=':searchView/:page' element={<Search />} />
								<Route path=':search/:page/:id' element={<BookDetail />} />
								<Route path='like/:search/:page/:id' element={<BookDetail />} />
								<Route
									path='publisher/:search/:page/:id'
									element={<BookDetail />}
								/>
							</Route>
							<Route path='/profile'>
								<Route path=':userProfile' element={<Profile />} />
								<Route
									path=':userProfile/edit'
									element={
										user ? <ProfileEdit /> : <Navigate replace={true} to='/' />
									}
								/>
							</Route>
						</Route>
						<Route path='*' element={<NotFound />}></Route>
					</Routes>
				) : (
					<Loading BackDrop={true} />
				)}
			</Suspense>
		</BrowserRouter>
	);
}
