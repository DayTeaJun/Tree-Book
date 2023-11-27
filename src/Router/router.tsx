import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeFeed from '../Pages/HomeFeed/HomeFeed';
import BookDetail from '../Pages/BookDetail/BookDetail';
import Search from '../Pages/Search/Search';

export default function Router() {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route path='/' element={<HomeFeed />}></Route>
				<Route path='/search' element={<Search />}>
					<Route path=':bookDetail' element={<BookDetail />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
