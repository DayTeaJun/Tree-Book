import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeFeed from '../Pages/HomeFeed/HomeFeed';
import SearchMain from '../Pages/SearchPage/SearchMain';

export default function Router() {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route path='/' element={<HomeFeed />}></Route>
				<Route path='/search' element={<SearchMain />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
