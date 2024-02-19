import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import HomeFeed from '../Pages/HomeFeed/HomeFeed';
import BookDetail from '../Pages/BookDetail/BookDetail';
import { useAuthContext } from '../Context/useAuthContext';
import { Profile } from '../Pages/Profile/Profile';
import { ProfileEdit } from '../Pages/Profile/ProfileEdit';
import MainLayout from '../Layouts/MainLayout';
import { Loading } from '../Components/LoadingSpinner/Loading';
import SignIn from '../Pages/LoginSignup/SignIn';
import SignUp from '../Pages/LoginSignup/SignUp';
import Search from '../Pages/Search/Search';

export default function Router() {
	const { isAuthReady, user } = useAuthContext();

	return (
		<BrowserRouter basename='/'>
			{isAuthReady ? (
				<Routes>
					<Route element={<MainLayout />}>
						<Route
							path='/signup'
							element={!user ? <SignUp /> : <Navigate replace={true} to='/' />}
						/>
						<Route
							path='/login'
							element={!user ? <SignIn /> : <Navigate replace={true} to='/' />}
						/>
						<Route path='/' element={<HomeFeed />} />

						<Route path='/search/' element={<Outlet />}>
							<Route path=':searchView/:page' element={<Search />} />
							<Route path=':search/:page/:id' element={<BookDetail />} />
							<Route path='like/:search/:page/:id' element={<BookDetail />} />
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
				</Routes>
			) : (
				<Loading BackDrop={true} />
			)}
		</BrowserRouter>
	);
}
