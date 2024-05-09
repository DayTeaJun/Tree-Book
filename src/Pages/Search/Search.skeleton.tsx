import { Box, Divider } from '@mui/material';
import { Shimmer } from '../../Styles/Common';

export const SearchSkeleton = () => {
	return (
		<Box
			component='li'
			sx={{
				width: 'calc((100% - 20px) / 2)',
				height: '120px',
				display: 'flex',
				color: 'text.primary',
				fontWeight: 'bold',
				paddingRight: '20px',
				marginBottom: '10px',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
					cursor: 'pointer',
				}}
			>
				<Box
					sx={{
						width: '80px',
						height: '100%',
						borderRadius: '5px',
						overflow: 'hidden',
						flexShrink: 0,
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: 'calc(90% - 140px)',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						gap: '3px',
						overflow: 'hidden',
					}}
				>
					<Box sx={{ height: '25px', overflow: 'hidden' }}>
						<Shimmer />
					</Box>
					<Box sx={{ height: '20px', overflow: 'hidden' }}>
						<Shimmer />
					</Box>
					<Divider sx={{ margin: '5px 0' }} />
				</Box>
			</Box>
		</Box>
	);
};
