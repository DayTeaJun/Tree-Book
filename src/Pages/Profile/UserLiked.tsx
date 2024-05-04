import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { UserLikedProps } from '../../Types/userType';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';

const UserLiked = ({ uid, displayName }: UserLikedProps) => {
	const fetchLiked = async (uid: string) => {
		const LikesRef = collection(appFirestore, 'LikedBook');
		const likedQuery = query(LikesRef, where('likeBy.' + uid, '==', true));

		const likedQuerySnapshot = await getDocs(likedQuery);
		const result = likedQuerySnapshot.docs.map((doc) => doc.data());
		result.sort((a, b) => b.createdTime.seconds - a.createdTime.seconds);
		return result;
	};

	const {
		data: userBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['userBooks', uid],
		queryFn: () => fetchLiked(uid ?? ''),
	});

	return (
		<>
			{userBooks && (
				<Box
					component='section'
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						backgroundColor: 'background.content',
						borderRadius: '5px',
						padding: '10px',
					}}
				>
					<Typography
						component='h3'
						fontSize='1.1em'
						fontWeight='bold'
						color='text.primary'
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{`${displayName}님의 즐겨찾기한 책들`}
					</Typography>
					<Box
						sx={{
							minHeight: '216px',
							width: '100%',
							display: 'flex',
							gap: '10px',
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
						{userBooks.length !== 0 ? (
							(userBooks as BookData[]).map((item: BookData) => (
								<BookItem
									item={item}
									page={item.page}
									id={item.id}
									search={item.search}
									key={item.url}
									like={item.isbn}
								></BookItem>
							))
						) : (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									margin: '0 auto',
								}}
							>
								<Typography component='p'>
									아직 즐겨찾기한 책이 없습니다.
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};

export default UserLiked;
