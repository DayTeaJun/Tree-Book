import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { P } from './Profile.style';
import { UserLikedProps } from '../../Types/userType';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { useQuery } from '@tanstack/react-query';

const UserLiked = ({ uid, displayName }: UserLikedProps) => {
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
					<P.PP>
						<P.Strong>{displayName}</P.Strong>
						님의 좋아요 표시한 책들 목록
					</P.PP>
					<P.ContainerBook>
						{(userBooks as BookData[]).map((item: BookData) => (
							<BookItem
								item={item}
								page={item.page}
								id={item.id}
								search={item.search}
								key={item.url}
								like={item.isbn}
							></BookItem>
						))}
					</P.ContainerBook>
				</P.ContainerLiked>
			)}
		</>
	);
};

export default UserLiked;
