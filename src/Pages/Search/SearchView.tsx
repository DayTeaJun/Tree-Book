import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { useNavigate, useParams } from 'react-router-dom';
import { BookImg } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';
import { S } from '../HomeFeed/homFeed.style';

export default function SearchView() {
	const searchTitle: string = useParams().searchView || '';
	const navigate = useNavigate();

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchTitle],
		queryFn: () => getBooks(searchTitle),
		enabled: !!searchTitle,
		refetchOnWindowFocus: false,
	});

	const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.target as HTMLImageElement;
		target.src = errorImg;
	};

	return (
		<>
			{books && books.length !== 0 ? (
				<S.Section>
					{books.map((el: BData) => (
						<S.Container
							onClick={() => {
								navigate(`/search/detail/${el.title}`, {
									state: { bookData: el },
								});
							}}
							key={el.isbn}
						>
							<BookImg
								style={{ borderRadius: '5px' }}
								src={el.thumbnail}
								alt={`책 ${el.title}의 이미지`}
								onError={onErrorImg}
							/>
							<S.H2>{el.title}</S.H2>
						</S.Container>
					))}
				</S.Section>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
