import { Box, Typography } from '@mui/material';
import BestBook from '../../Components/Carousel/BestBook';
import { Helmet } from 'react-helmet-async';
import { PopularSection } from './PopularSection';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import BestView from '../../Components/Carousel/BestView';

export default function HomeFeed() {
	const { isDownSM } = useMediaQueries();

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
					gap: '20px',
				}}
			>
				<Box
					component='section'
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{isDownSM && (
						<Typography
							component='h2'
							fontWeight='bold'
							fontSize='1.5em'
							sx={{
								color: 'text.primary',
							}}
						>
							유저들의 책 베스트
						</Typography>
					)}
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
					<PopularSection />
					<BestView />
				</Box>
			</Box>
		</>
	);
}
