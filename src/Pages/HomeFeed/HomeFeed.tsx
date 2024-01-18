import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import { BData } from '../../Types/bookData';
import { BookImg } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';
import { S } from './homFeed.style';
import BookItem from '../Search/BookItem';

export default function HomeFeed() {
	const { data: books, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getBooks('자바스크립트', 12),
		refetchOnWindowFocus: false,
	});

	const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.target as HTMLImageElement;
		target.src = errorImg;
	};

	return (
		<>
			{books && books.length !== 0 ? (
				<>
					<S.Section>
						{books.map((item: BData, index: number) => (
							<BookItem
								item={item}
								id={index}
								search={'자바스크립트'}
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
