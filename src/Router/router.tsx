import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HomeFeed from '../Pages/HomeFeed/HomeFeed';
import BookDetail from '../Pages/BookDetail/BookDetail';
import Search from '../Pages/Search/Search';
import SearchView from '../Pages/Search/SearchView';

export default function Router() {
	return (
		<BrowserRouter basename='/'>
			<Search />

			<Routes>
				<Route path='/' element={<HomeFeed />} />
				<Route path='/search/' element={<Outlet />}>
					<Route path='' element={<Search />} />
					<Route path='detail/:bookDetail' element={<BookDetail />} />
					<Route path=':searchView' element={<SearchView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
