import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { useParams } from 'react-router-dom';
import { S } from '../HomeFeed/homFeed.style';
import BookItem from './BookItem';

export default function SearchView() {
	const searchTitle: string = useParams().searchView || '';

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchTitle],
		queryFn: () => getBooks(searchTitle),
		enabled: !!searchTitle,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			{books && books.length !== 0 ? (
				<S.Section>
					{books.map((item: BData, index: number) => (
						<BookItem
							item={item}
							id={index}
							search={searchTitle || ''}
							key={item.isbn}
						></BookItem>
					))}
				</S.Section>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
