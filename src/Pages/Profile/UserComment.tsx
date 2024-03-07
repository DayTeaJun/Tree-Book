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
		return <UserLikedSkeleton comment={uid} />;
	}

	return (
		<>
			{userBooks && (
				<P.ContainerLiked>
					<P.H2>작성한 코멘트 목록</P.H2>
					<P.ContainerComment>
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
					</P.ContainerComment>
				</P.ContainerLiked>
			)}
		</>
	);
};
