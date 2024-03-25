import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';
import { Skeleton } from '../../Types/bookType';

export const BookItemSkeleton = ({ comment }: Skeleton) => {
	if (comment) {
		return (
			<Box
				sx={{
					width: '90%',
					height: '95px',
					overflow: 'hidden',
					borderRadius: '5px',
					flexShrink: '0',
				}}
			>
				<Shimmer />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				width: '120px',
				height: '210px',
				borderRadius: '5px',
				padding: '10px',
				backgroundColor: 'background.book',
			}}
		>
			<Box
				sx={{
					width: '100px',
					height: '140px',
					borderRadius: '10px',
					overflow: 'hidden',
				}}
			>
				<Shimmer />
			</Box>
			<Box
				sx={{
					width: '100px',
					height: '14px',
					overflow: 'hidden',
					marginTop: '10px',
				}}
			>
				<Shimmer />
			</Box>
			<Box
				sx={{
					width: '100px',
					height: '12px',
					overflow: 'hidden',
					marginTop: '10px',
				}}
			>
				<Shimmer />
			</Box>
		</Box>
	);
};
