import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BookData } from '../../Types/bookType';
import { appFirestore } from '../../Firebase/config';
import BookItem from './BookItem';
import { Box } from '@mui/material';
import { Loading } from '../LoadingSpinner/Loading';
import { BookItemSkeleton } from './BookItem.skeleton';

export const BookBest = () => {
	const [likedBooks, setLikedBooks] = useState<DocumentData | BookData[]>();

	useEffect(() => {
		const fetchLikedMeetups = async () => {
			try {
				const LikesRef = collection(appFirestore, 'BooksLikes');
				const likedQuery = query(LikesRef);
				const likedQuerySnapshot = await getDocs(likedQuery);
				const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());
				likedQueryData.sort(
					(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
				);
				const topTwoDocuments = likedQueryData.slice(0, 2);

				console.log(topTwoDocuments);

				setLikedBooks(topTwoDocuments);
			} catch (error) {
				console.error(error);
			}
		};

		fetchLikedMeetups();
	}, []);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{likedBooks ? (
					<>
						{likedBooks.map((item: BookData) => (
							<BookItem
								item={item}
								page={item.page}
								id={item.id}
								search={item.search}
								key={item.isbn}
							></BookItem>
						))}
					</>
				) : (
					<>
						{Array.from({ length: 2 }).map((_, index) => (
							<BookItemSkeleton key={index} />
						))}
					</>
				)}
			</Box>
		</>
	);
};
