import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { S } from './homFeed.style';
import { BookBest } from '../../Components/Books/BookBest';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';

export default function HomeFeed() {
	const { data: books, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getBooks('리액트', 10),
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<S.Section>
				<S.ContainerBestBook>
					<S.H2>Best</S.H2>
					<BookBest />
				</S.ContainerBestBook>
				<S.ContainerBook>
					{books && (
						<>
							{books.map((item: BookData, index: number) => (
								<BookItem
									item={item}
									page={'1'}
									id={index}
									search={'리액트'}
									key={item.isbn}
								></BookItem>
							))}
						</>
					)}
					{isLoading && (
						<>
							{Array.from({ length: 10 }).map((_, index) => (
								<BookItemSkeleton key={index} />
							))}
						</>
					)}
				</S.ContainerBook>
				{books && books.length === 0 && <h2>not found</h2>}
			</S.Section>
		</>
	);
}
