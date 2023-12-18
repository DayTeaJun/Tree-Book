import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BData } from '../../Types/bookData';
import { Books } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';
import CarouselSlick from '../../Components/Carousel/Carousel';

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
			<CarouselSlick />
			{books && books.length !== 0 ? (
				<Books $search={true}>
					{books.map((el: BData) => (
						<Link
							to={`/search/detail/${el.title}`}
							state={{ bookData: el }}
							key={el.isbn}
						>
							<img
								style={{ borderRadius: '5px' }}
								src={el.thumbnail}
								alt={`책 ${el.title}의 이미지`}
								onError={onErrorImg}
							/>
						</Link>
					))}
				</Books>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}
		</>
	);
}
