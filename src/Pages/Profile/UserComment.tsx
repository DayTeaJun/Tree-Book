import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { UserLikedProps } from '../../Types/userType';
import BookItem from '../../Components/Books/BookItem';
import { useQuery } from '@tanstack/react-query';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { BookData } from '../../Types/bookType';
import { Box, Divider, Typography } from '@mui/material';

export const UserComment = ({ uid }: UserLikedProps) => {
	const fetchLiked = async (uid: string) => {
		const LikesRef = collection(appFirestore, 'comment');
		const likedQuery = query(LikesRef, where('id', '==', uid));

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
		queryKey: ['userComment', uid],
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
						작성한 코멘트 목록
					</Typography>
					<Box
						sx={{
							width: '100%',
							height: '290px',
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
						{userBooks.length !== 0 ? (
							(userBooks as BookData[]).map((item: BookData, index: number) => (
								<BookItem
									item={item}
									page={item.page}
									id={item.id}
									search={item.search}
									key={index}
									like={item.isbn}
									comment={item.comments}
								></BookItem>
							))
						) : (
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									margin: '0 auto',
								}}
							>
								<p>아직 작성한 코멘트가 없습니다.</p>
							</Box>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};
