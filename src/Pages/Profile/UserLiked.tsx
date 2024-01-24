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

const UserLiked = ({ uid, displayName }: UserLikedProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [likedBooks, setLikedBooks] = useState<DocumentData | BookData[]>();

	useEffect(() => {
		const fetchLikedMeetups = async () => {
			try {
				const LikesRef = collection(appFirestore, 'BooksLikes');
				const likedQuery = query(LikesRef, where('likeBy.' + uid, '==', true));

				const likedQuerySnapshot = await getDocs(likedQuery);
				const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());

				setIsLoading(false);
				setLikedBooks(likedQueryData);
			} catch (error) {
				console.error(error);
				setIsLoading(true);
			}
		};

		fetchLikedMeetups();
	}, [uid]);

	return (
		<>
			{!isLoading && likedBooks && (
				<>
					<P.PLiked>
						<P.Strong>{displayName}</P.Strong>
						님의 좋아요 표시한 책들 목록
					</P.PLiked>
					<P.Container>
						{likedBooks.map((item: BookData) => (
							<BookItem
								item={item}
								id={item.id}
								search={item.search}
								key={item.isbn}
							></BookItem>
						))}
					</P.Container>
				</>
			)}
		</>
	);
};

export default UserLiked;
