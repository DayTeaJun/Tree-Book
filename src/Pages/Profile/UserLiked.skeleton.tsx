import { Box } from '@mui/material';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { Shimmer } from '../../Styles/Common';
import { P } from './Profile.style';
import { Skeleton } from '../../Types/bookType';

export const UserLikedSkeleton = ({ comment }: Skeleton) => {
	return (
		<P.ContainerLiked style={{ overflow: 'hidden' }}>
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
				<P.ContainerComment>
					{Array.from({ length: 2 }).map((_, index) => (
						<BookItemSkeleton comment={comment} key={index} />
					))}
				</P.ContainerComment>
			) : (
				<P.ContainerBook
					style={{ width: '665px', height: '230px', overflow: 'hidden' }}
				>
					{Array.from({ length: 4 }).map((_, index) => (
						<BookItemSkeleton key={index} />
					))}
				</P.ContainerBook>
			)}
		</P.ContainerLiked>
	);
};
