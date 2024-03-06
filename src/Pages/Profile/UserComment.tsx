import { collection, getDocs, query, where } from 'firebase/firestore';
import { P } from './Profile.style';
import { appFirestore } from '../../Firebase/config';
import { UserLikedProps } from '../../Types/userType';
import BookItem from '../../Components/Books/BookItem';
import { useQuery } from '@tanstack/react-query';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { BookData } from '../../Types/bookType';
import { Box } from '@mui/material';

export const UserComment = ({ uid, displayName }: UserLikedProps) => {
	const fetchLiked = async (uid?: string) => {
		const LikesRef = collection(appFirestore, 'comments');
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
		queryFn: () => fetchLiked(uid),
	});

	if (isLoading) {
		return <UserLikedSkeleton />;
	}

	return (
		<>
			{userBooks && (
				<P.ContainerLiked>
					<P.PP>
						<P.Strong>{displayName}</P.Strong>님의 작성한 코멘트 목록
					</P.PP>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
							alignItems: 'center',
						}}
					>
						{(userBooks as BookData[]).map((item: BookData) => (
							<BookItem
								item={item}
								page={item.page}
								id={item.id}
								search={item.search}
								key={item.url}
								like={item.isbn}
								comment={item.comments}
							></BookItem>
						))}
					</Box>
				</P.ContainerLiked>
			)}
		</>
	);
};
