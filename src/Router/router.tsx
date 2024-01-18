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
import TopNavbar from '../Layouts/topNavbar';
import Signup from '../Pages/LoginSignup/Signup';
import Login from '../Pages/LoginSignup/Login';
import { useAuthContext } from '../Hook/FirebaseHook/useAuthContext';
import { Profile } from '../Pages/Profile/Profile';
import { ProfileEdit } from '../Pages/Profile/ProfileEdit';

export default function Router() {
	const { isAuthReady, user } = useAuthContext();

	return (
		<BrowserRouter basename='/'>
			<TopNavbar />

			{isAuthReady ? (
				<Routes>
					<Route path='/' element={<HomeFeed />} />
					<Route
						path='/signup'
						element={!user ? <Signup /> : <Navigate replace={true} to='/' />}
					/>
					<Route
						path='/Login'
						element={!user ? <Login /> : <Navigate replace={true} to='/' />}
					/>
					<Route path='/search/' element={<Outlet />}>
						<Route path=':searchView' element={<SearchView />} />
						<Route path=':search/:id' element={<BookDetail />} />
					</Route>
					<Route path='/profile'>
						<Route
							path=''
							element={user ? <Profile /> : <Navigate replace={true} to='/' />}
						></Route>
						<Route path=':userProfile' element={<Profile />}></Route>
						<Route
							path='edit'
							element={
								user ? <ProfileEdit /> : <Navigate replace={true} to='/' />
							}
						></Route>
					</Route>
				</Routes>
			) : (
				'Loading...'
			)}
		</BrowserRouter>
	);
}
