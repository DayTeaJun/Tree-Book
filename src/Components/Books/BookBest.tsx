import { collection, getDocs, query } from 'firebase/firestore';
import { BookData } from '../../Types/bookType';
import { appFirestore } from '../../Firebase/config';
import BookItem from './BookItem';
import { Box } from '@mui/material';
import { BookItemSkeleton } from './BookItem.skeleton';
import { useQuery } from '@tanstack/react-query';

export const BookBest = () => {
	const fetchLiked = async () => {
		const LikesRef = collection(appFirestore, 'BooksLikes');
		const likedQuery = query(LikesRef);
		const likedQuerySnapshot = await getDocs(likedQuery);
		const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());
		likedQueryData.sort(
			(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
		);
		const result = likedQueryData.slice(0, 2);

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
						{(likedBooks.result as BookData[]).map((item: BookData) => (
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
