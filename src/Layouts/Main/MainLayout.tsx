import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Grid } from '@mui/material';
import { Footer } from '../Footer/Footer';

export default function MainLayout() {
	return (
		<>
			<Header />
			<Grid container flexGrow='1'>
				<Grid item xs={0} md={2} lg={1} />
				<Grid item xs={12} md={8} lg={10}>
					<Outlet />
				</Grid>
				<Grid item xs={0} md={2} lg={1} />
			</Grid>
			<Footer />
		</>
	);
}
