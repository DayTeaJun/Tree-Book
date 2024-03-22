import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Grid } from '@mui/material';

export default function MainLayout() {
	return (
		<>
			<Header />
			<Grid container>
				<Grid xs={0} md={3} lg={2} />
				<Grid xs={12} md={6} lg={8}>
					<Outlet />
				</Grid>
				<Grid xs={0} md={3} lg={2} />
			</Grid>
		</>
	);
}
