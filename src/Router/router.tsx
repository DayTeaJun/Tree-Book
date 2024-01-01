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
						<Route path='detail/:bookDetail' element={<BookDetail />} />
						<Route path=':searchView' element={<SearchView />} />
					</Route>
				</Routes>
			) : (
				'Loading...'
			)}
		</BrowserRouter>
	);
}
