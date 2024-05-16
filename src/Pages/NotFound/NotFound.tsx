import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<Box
			component='section'
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				gap: '30px',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<NotInterestedIcon sx={{ transform: 'scale(3)' }} />

			<Typography
				component='h1'
				fontSize='2em'
				fontWeight='bold'
				sx={{ textAlign: 'center' }}
			>
				존재하지 않는 페이지입니다.
			</Typography>
			<Box
				component='button'
				sx={{
					border: '1px solid',
					borderRadius: '10px',
					padding: '10px',
					backgroundColor: 'background.search',
					cursor: 'pointer',
				}}
				type='button'
				onClick={() => navigate('/')}
			>
				<Typography
					component='p'
					fontSize='1.8em'
					fontWeight='bold'
					color='text.secondary'
				>
					홈으로 이동하기
				</Typography>
			</Box>
		</Box>
	);
};
