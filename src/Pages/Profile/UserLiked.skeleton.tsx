import { Box } from '@mui/material';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { Shimmer } from '../../Styles/Common';
import { Skeleton } from '../../Types/bookType';

export const UserLikedSkeleton = ({ comment }: Skeleton) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				padding: '10px',
				backgroundColor: 'background.content',
				borderRadius: '5px',
			}}
		>
			<Box
				sx={{
					width: '300px',
					height: '18px',
					overflow: 'hidden',
					margin: '0 auto',
					backgroundColor: 'background.book',
				}}
			>
				<Shimmer />
			</Box>
			{comment ? (
				<Box
					sx={{
						width: '100%',
						height: '230px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '10px',
						overflowY: 'auto',
						overflowX: 'hidden',
						'&::-webkit-scrollbar': {
							width: '10px',
							borderRadius: '6px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'background.hover',
							borderRadius: '6px',
						},
					}}
				>
					{Array.from({ length: 2 }).map((_, index) => (
						<BookItemSkeleton comment={comment} key={index} />
					))}
				</Box>
			) : (
				<Box
					sx={{
						width: '100%',
						minHeight: '216px',
						display: 'flex',
						gap: '20px',
						overflowX: 'auto',
						overflowY: 'hidden',
						padding: '10px 0',
						'&::-webkit-scrollbar': {
							height: '10px',
							borderRadius: '6px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'background.hover',
							borderRadius: '6px',
						},
					}}
				>
					{Array.from({ length: 10 }).map((_, index) => (
						<BookItemSkeleton key={index} />
					))}
				</Box>
			)}
		</Box>
	);
};
