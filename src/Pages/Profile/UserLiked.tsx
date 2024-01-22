import {
	DocumentData,
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFirestore } from '../../Firebase/config';
import { BData } from '../../Types/bookData';
import BookItem from '../../Components/Books/BookItem';

interface UserLikedProps {
	uid?: string;
	displayName?: string | null;
}

const UserLiked = ({ uid, displayName }: UserLikedProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [likedBooks, setLikedBooks] = useState<DocumentData[]>();

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

	console.log(likedBooks);
	return (
		<>
			<p>{displayName}님의 좋아요 표시한 책들 목록</p>
			{/* {!isLoading &&
				likedBooks &&
				likedBooks.map((item: BData, index: number) => (
					<BookItem
						item={item}
						id={index}
						search={'리액트'}
						key={item.isbn}
					></BookItem>
				))} */}
		</>
	);
};

export default UserLiked;
