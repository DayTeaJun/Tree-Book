import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { BookData } from '../../Types/bookType';
import BookItem from './BookItem';
import { Box } from '@mui/material';
import { BookItemSkeleton } from './BookItem.skeleton';
import { useQuery } from '@tanstack/react-query';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { useEffect, useState } from 'react';

export const BookBest = () => {
	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['likedBooks'],
		queryFn: () => getLikedBooks('best'),
	});

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{likedBooks && likedBooks.length !== 0 && (
					<>
						{(likedBooks as BookData[]).map((item: BookData) => (
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
