import { Box } from '@mui/material';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { Shimmer } from '../../Styles/Common';
import { P } from './Profile.style';
import { Skeleton } from '../../Types/bookType';

export const UserLikedSkeleton = ({ comment }: Skeleton) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
			}}
		>
			<Box
				sx={{
					width: '300px',
					height: '18px',
					overflow: 'hidden',
					margin: '0 auto',
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
						padding: '1em 0',
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
						minHeight: '250px',
						display: 'flex',
						padding: '1em 0',
						gap: '10px',
						overflowX: 'auto',
						overflowY: 'hidden',
						'&::-webkit-scrollbar': {
							height: '10px',
							borderRadius: '6px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'background.hover',
							borderRadius: '6px',
						},
					}}
					style={{ width: '665px', height: '230px', overflow: 'hidden' }}
				>
					{Array.from({ length: 6 }).map((_, index) => (
						<BookItemSkeleton key={index} />
					))}
				</Box>
			)}
		</Box>
	);
};
