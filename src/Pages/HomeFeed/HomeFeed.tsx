import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { S } from './homFeed.style';

export default function HomeFeed() {
	const { data: books, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getBooks('리액트', 14),
		refetchOnWindowFocus: false,
	});

	return (
		<>
			{books && books.length !== 0 ? (
				<>
					<S.Section>
						{books.map((item: BookData, index: number) => (
							<BookItem
								item={item}
								id={index}
								search={'리액트'}
								key={item.isbn}
							></BookItem>
						))}
					</S.Section>
				</>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}
		</>
	);
}
