import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { BookData } from '../../Types/bookType';
import { appFirestore } from '../../Firebase/config';
import BookItem from './BookItem';
import { Box } from '@mui/material';
import { BookItemSkeleton } from './BookItem.skeleton';
import { useQuery } from '@tanstack/react-query';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { useEffect, useState } from 'react';

export const BookBest = () => {
	const [books, setBooks] = useState<DocumentData[]>([]);

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['likedBooks'],
		queryFn: () => getLikedBooks(),
	});

	useEffect(() => {
		if (likedBooks) {
			likedBooks.sort(
				(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
			);
			const result = likedBooks.slice(0, 2);
			setBooks(result);
		}
	}, [likedBooks]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{books.length !== 0 && (
					<>
						{(books as BookData[]).map((item: BookData) => (
							<BookItem
								item={item}
								page={item.page}
								id={item.id}
								search={item.search}
								key={item.url}
								like={item.isbn}
							></BookItem>
						))}
					</>
				)}
				{isLoading && (
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
