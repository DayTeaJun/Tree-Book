import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';

export const CarouselSkeleton = () => {
	return (
		<Box
			sx={{
				width: '100%',
				padding: '30px 70px',
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '70%',
				}}
			>
				<Box
					sx={{
						backgroundColor: 'background.book',
						borderRadius: '5px',
						display: 'inline-block',
						width: '48px',
						height: '28px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>

				<Box
					sx={{
						backgroundColor: 'background.book',
						width: '100%',
						height: '36px',
						borderRadius: '5px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>

				<Box
					sx={{
						backgroundColor: 'background.book',
						width: '100%',
						height: '53px',
						borderRadius: '5px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>

				<Box
					sx={{
						backgroundColor: 'background.book',
						width: '100%',
						height: '27px',
						borderRadius: '5px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
			</Box>
			<Box
				sx={{
					backgroundColor: 'background.book',
					width: '150px',
					height: '240px',
					borderRadius: '5px',
					overflow: 'hidden',
				}}
			>
				<Shimmer />
			</Box>
		</Box>
	);
};
