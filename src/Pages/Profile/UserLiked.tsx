import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { P } from './Profile.style';
import { UserLikedProps } from '../../Types/userType';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';

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
				<P.ContainerLiked>
					<P.H2>내가 좋아요한 책들</P.H2>
					<P.ContainerBook>
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
								<p>아직 좋아요한 책이 없습니다.</p>
							</Box>
						)}
					</P.ContainerBook>
				</P.ContainerLiked>
			)}
		</>
	);
};

export default UserLiked;
