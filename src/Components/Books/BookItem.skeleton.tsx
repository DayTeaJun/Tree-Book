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
				width: '140px',
				height: '200px',
				borderRadius: '5px',
				flexShrink: '0',
				backgroundColor: 'background.book',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					borderRadius: '10px',
					overflow: 'hidden',
				}}
			>
				<Shimmer />
			</Box>
		</Box>
	);
};
