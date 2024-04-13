import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { UserLikedProps } from '../../Types/userType';
import BookItem from '../../Components/Books/BookItem';
import { useQuery } from '@tanstack/react-query';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { BookData } from '../../Types/bookType';
import { Box, Typography } from '@mui/material';

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

	if (isLoading) {
		return <UserLikedSkeleton comment={uid} />;
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
						작성한 코멘트 목록
					</Typography>
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
								backgroundColor: 'background.book',
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
