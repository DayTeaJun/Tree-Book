import { Box } from '@mui/material';
import BestBook from '../../Components/Carousel/BestBook';
import { Helmet } from 'react-helmet-async';
import { PopularSection } from './PopularSection';
import BestView from '../../Components/Carousel/BestView';
import { H1 } from '../../Styles/Common';

export default function HomeFeed() {
	return (
		<>
			<Helmet>
				<title>TreeBook - 책들의 나무</title>
			</Helmet>
			<H1>TreeBook 홈피드</H1>
			<Box
				component='main'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					gap: '20px',
					paddingBottom: '20px',
				}}
			>
				<BestBook />
				<PopularSection />
				<BestView />
			</Box>
		</>
	);
}
