import { Box } from '@mui/material';
import BestBook from '../../Components/Carousel/BestBook';
import { Helmet } from 'react-helmet-async';
import { PopularSection } from './PopularSection';
import { Footer } from '../../Layouts/Footer/Footer';

export default function HomeFeed() {
	return (
		<>
			<Helmet>
				<title>TreeBook - 책들의 나무</title>
			</Helmet>
			<Box
				component='main'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					padding: '20px 0',
					gap: '20px',
				}}
			>
				<Box
					component='section'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						width: '100%',
						height: '100%',
						margin: '0 auto',
					}}
				>
					<BestBook />
				</Box>

				<Box
					component='section'
					sx={{
						display: 'flex',
						width: '100%',
						height: '100%',
						gap: '20px',
						flexWrap: 'wrap',
						paddingTop: '20px',
					}}
				>
					<PopularSection props='commentTotalNumber' />
					<PopularSection props='views' />
				</Box>
			</Box>
		</>
	);
}
