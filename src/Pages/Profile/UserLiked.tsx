import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { UserLikedProps } from '../../Types/userType';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';

const UserLiked = ({ uid }: UserLikedProps) => {
	const fetchLiked = async (uid?: string) => {
		const LikesRef = collection(appFirestore, 'BooksLikes');
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
		queryFn: () => fetchLiked(uid),
	});

	if (isLoading) {
		return <UserLikedSkeleton />;
	}

	return (
		<>
			{userBooks && (
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
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
							'&::before': {
								content: "''",
								margin: '0 1em',
								flexGrow: 1,
								height: '0.5px',
								backgroundColor: 'text.primary',
							},
							'&::after': {
								content: "''",
								margin: '0 1em',
								flexGrow: 1,
								height: '0.5px',
								backgroundColor: 'text.primary',
							},
						}}
					>
						내가 즐겨찾기한 책들
					</Typography>
					<Box
						sx={{
							width: '100%',
							minHeight: '228px',
							display: 'flex',
							padding: '1em 0',
							gap: '10px',
							overflowX: 'auto',
							overflowY: 'hidden',
							'&::-webkit-scrollbar': {
								height: '10px',
								borderRadius: '6px',
								backgroundColor: 'background.book',
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
									margin: '0 auto',
								}}
							>
								<p>아직 즐겨찾기한 책이 없습니다.</p>
							</Box>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};

export default UserLiked;
