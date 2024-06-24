import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { useEffect } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { BookDetailItem } from './BookDetailItem';
import { BookSimilar } from './BookSimilar';
import { Comment } from './Comments/Comment';

export const BookViews = ({ item }: { item: BookData }) => {
	const queryClient = useQueryClient();
	const isbn = item && item?.isbn;

	const { data: documents } = useQuery({
		queryKey: ['likedBook', isbn],
		queryFn: () => getDocuments('likedBook', isbn),
		refetchOnWindowFocus: false,
	});

	const handleView = async () => {
		if (documents) {
			const views = documents[0]?.views ?? 0;

			await setDoc(doc(collection(appFirestore, 'likedBook'), isbn), {
				...documents[0],
				...item,
				views: views + 1,
			});
			queryClient.invalidateQueries({ queryKey: ['likedBook'] });
		}
	};

	useEffect(() => {
		handleView();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{documents && (
				<>
					<BookDetailItem item={item} likedBook={documents} />
					<Comment item={item} likedBook={documents} />
					<BookSimilar item={item} />
				</>
			)}
		</>
	);
};
