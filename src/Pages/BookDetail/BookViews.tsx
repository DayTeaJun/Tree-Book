import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { useEffect } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { BookDetailItem } from './BookDetailItem';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { BookSimilar } from './BookSimilar';

export const BookViews = ({ item }: { item: BookData }) => {
	const queryClient = useQueryClient();
	const isbn = item && item?.isbn;

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['LikedBook', isbn],
		queryFn: () => getDocuments('LikedBook', isbn),
		refetchOnWindowFocus: false,
	});

	const handleView = async () => {
		if (documents) {
			const views = documents[0]?.views ?? 0;

			await setDoc(doc(collection(appFirestore, 'LikedBook'), isbn), {
				...documents[0],
				...item,
				views: views + 1,
			});
			queryClient.invalidateQueries({ queryKey: ['LikedBook'] });
		}
	};

	useEffect(() => {
		handleView();
	}, []);

	return (
		<>
			<BookDetailItem item={item} likedBook={documents && documents} />
			<BookSimilar item={item} />
			<CommentForm item={item} likedBook={documents && documents} />
		</>
	);
};
