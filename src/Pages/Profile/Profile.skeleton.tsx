import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';

export const ProfileSekeleton = () => {
	return (
		<Box
			component='section'
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				overflow: 'hidden',
				gap: '20px',
			}}
		>
			<Box
				sx={{
					width: '285px',
					minHeight: '545px',
					flexShrink: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '20px',
					borderRight: 'solid 1px #ccc',
				}}
			>
				<Box
					sx={{
						border: 'none',
						width: '200px',
						height: '200px',
						flexShrink: 1,
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '200px',
						height: '24px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '200px',
						height: '16px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '200px',
						height: '36px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '200px',
						height: '36px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
			</Box>
		</Box>
	);
};
