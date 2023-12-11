import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BData } from '../../Types/bookData';
import { BookImg, Books } from '../../Components/Books/books.style';

export default function HomeFeed() {
	const { data: books, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getBooks('리액트', 6),
		refetchOnWindowFocus: false,
	});

	const { data: books2 } = useQuery({
		queryKey: ['books2'],
		queryFn: () => getBooks('리액트', 6, 2),
		refetchOnWindowFocus: false,
	});

	console.log(books);

	return (
		<>
			<h1>Home</h1>
			<p>메인 페이지</p>
			<Link to='/search'>검색 페이지 이동</Link>
			{books && books2 && books.length !== 0 ? (
				<Books $home={true}>
					<BookImg>
						{books.map((el: BData) => (
							<Link
								to={`./search/${el.title}`}
								state={{ bookData: el }}
								key={el.isbn}
							>
								<img
									style={{ borderRadius: '5px' }}
									src={el.thumbnail}
									alt={`책 ${el.title}의 이미지`}
								/>
							</Link>
						))}
					</BookImg>

					<BookImg $rev={true}>
						{books2.map((el: BData) => (
							<Link
								to={`./search/${el.title}`}
								state={{ bookData: el }}
								key={el.isbn}
							>
								<img
									style={{ borderRadius: '5px' }}
									src={el.thumbnail}
									alt={`책 ${el.title}의 이미지`}
								/>
							</Link>
						))}
					</BookImg>
				</Books>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}
		</>
	);
}
