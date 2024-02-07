import {
	DocumentData,
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFirestore } from '../../Firebase/config';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { P } from './Profile.style';
import { UserLikedProps } from '../../Types/userType';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import { useQuery } from '@tanstack/react-query';

const UserLiked = ({ uid, displayName }: UserLikedProps) => {
	const fetchLiked = async () => {
		const LikesRef = collection(appFirestore, 'BooksLikes');
		const likedQuery = query(LikesRef, where('likeBy.' + uid, '==', true));

		const likedQuerySnapshot = await getDocs(likedQuery);
		const result = likedQuerySnapshot.docs.map((doc) => doc.data());
		return { result };
	};

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['likedBooks'],
		queryFn: () => fetchLiked(),
	});

	if (isLoading) {
		<UserLikedSkeleton />;
	}

	return (
		<>
			{likedBooks && (
				<P.ContainerLiked>
					<P.PP>
						<P.Strong>{displayName}</P.Strong>
						님의 좋아요 표시한 책들 목록
					</P.PP>
					<P.ContainerBook>
						{(likedBooks.result as BookData[]).map((item: BookData) => (
							<BookItem
								item={item}
								page={item.page}
								id={item.id}
								search={item.search}
								key={item.isbn}
							></BookItem>
						))}
					</P.ContainerBook>
				</P.ContainerLiked>
			)}
		</>
	);
};

export default UserLiked;
