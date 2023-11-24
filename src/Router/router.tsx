import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {
	return (
		<BrowserRouter basename='/'>
			<Routes>{/* <Route path='/' element={}></Route> */}</Routes>
		</BrowserRouter>
	);
}
