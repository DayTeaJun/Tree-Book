import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import { BData } from '../../Types/bookData';
import { BookImg } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';
import CarouselSlick from '../../Components/Carousel/Carousel';
import { S } from './homFeed.style';
import { useNavigate } from 'react-router-dom';

export default function HomeFeed() {
	const navigate = useNavigate();

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
					<CarouselSlick bookData={books} />
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
							</S.Container>
						))}
					</S.Section>
				</>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}
		</>
	);
}
