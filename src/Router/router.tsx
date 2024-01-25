import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import HomeFeed from '../Pages/HomeFeed/HomeFeed';
import BookDetail from '../Pages/BookDetail/BookDetail';
import SearchView from '../Pages/Search/SearchView';
import Signup from '../Pages/LoginSignup/Signup';
import Login from '../Pages/LoginSignup/Login';
import { useAuthContext } from '../Hook/FirebaseHook/useAuthContext';
import { Profile } from '../Pages/Profile/Profile';
import { ProfileEdit } from '../Pages/Profile/ProfileEdit';
import MainLayout from '../Layouts/MainLayout';
import { Loading } from '../Components/LoadingSpinner/Loading';

export default function Router() {
	const { isAuthReady, user } = useAuthContext();

	return (
		<BrowserRouter basename='/'>
			{isAuthReady ? (
				<Routes>
					<Route
						path='/signup'
						element={!user ? <Signup /> : <Navigate replace={true} to='/' />}
					/>
					<Route
						path='/Login'
						element={!user ? <Login /> : <Navigate replace={true} to='/' />}
					/>
					<Route element={<MainLayout />}>
						<Route path='/' element={<HomeFeed />} />

						<Route path='/search/' element={<Outlet />}>
							<Route path=':searchView/:page' element={<SearchView />} />
							<Route path=':search/:page/:id' element={<BookDetail />} />
						</Route>
						<Route path='/profile'>
							<Route
								path=''
								element={
									user ? <Profile /> : <Navigate replace={true} to='/' />
								}
							></Route>
							<Route path=':userProfile' element={<Profile />}></Route>
							<Route
								path='edit'
								element={
									user ? <ProfileEdit /> : <Navigate replace={true} to='/' />
								}
							></Route>
						</Route>
					</Route>
				</Routes>
			) : (
				<Loading BackDrop={true} />
			)}
		</BrowserRouter>
	);
}
