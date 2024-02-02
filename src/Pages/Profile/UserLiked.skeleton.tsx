import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { Shimmer } from '../../Styles/Common';
import { P } from './Profile.style';

export const UserLikedSkeleton = () => {
	return (
		<P.ContainerLiked>
			<P.PP
				style={{
					width: '400px',
					height: '16px',
					overflow: 'hidden',
					margin: '0 auto',
				}}
			>
				<Shimmer />
			</P.PP>
			<P.ContainerBook
				style={{ width: '665px', height: '260px', overflow: 'hidden' }}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<BookItemSkeleton key={index} />
				))}
			</P.ContainerBook>
		</P.ContainerLiked>
	);
};
