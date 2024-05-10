import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Box, Grid } from '@mui/material';
import { Footer } from '../Footer/Footer';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { BottomNav } from '../Header/BottomNav';

export default function MainLayout() {
	const { isDownMD } = useMediaQueries();
	return (
		<>
			<Header />
			<Grid container flexGrow='1'>
				<Grid item xs={0} md={1} lg={2} />
				<Grid
					item
					xs={12}
					md={10}
					lg={8}
					sx={{ padding: `${isDownMD ? '10px' : ''}` }}
				>
					<Outlet />
				</Grid>
				<Grid item xs={0} md={1} lg={2} />
			</Grid>
			{isDownMD ? <BottomNav /> : <Footer />}
		</>
	);
}
