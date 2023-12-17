import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { Link, useParams } from 'react-router-dom';
import { Books } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';

export default function SearchView() {
	const searchTitle: string = useParams().searchView || '';

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
							<h2>{el.title}</h2>
						</Link>
					))}
				</Books>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
