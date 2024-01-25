import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { useParams } from 'react-router-dom';
import { S } from '../HomeFeed/homFeed.style';
import BookItem from '../../Components/Books/BookItem';
import { Paginaition } from '../../Components/Pagination/Pagination';
import { Loading } from '../../Components/LoadingSpinner/Loading';

export default function SearchView() {
	const { searchView, page } = useParams<{
		searchView: string;
		page: string;
	}>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchView, page],
		queryFn: () => getBooks(searchView || '', 14, page),
		enabled: !!searchView,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			{books && books.length !== 0 ? (
				<S.Section>
					{books.map((item: BookData, index: number) => (
						<BookItem
							item={item}
							page={page}
							id={index}
							search={searchView || ''}
							key={item.isbn}
						></BookItem>
					))}
				</S.Section>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			<Paginaition page={page} searchView={searchView} />
		</>
	);
}
