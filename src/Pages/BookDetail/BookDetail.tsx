import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BData } from '../../Types/bookData';

export default function BookDetail() {
	const BD: string = useParams().bookDetail || '';
	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', BD],
		queryFn: () => getBooks(BD),
		enabled: !!BD,
	});

	return (
		<>
			{books ? (
				books.length > 1 ? (
					<>
						<div key={books[books.length - 1].isbn}>
							<img
								src={books[books.length - 1].thumbnail}
								alt={`책 ${books[books.length - 1].title}의 이미지`}
							/>
							<h2>{books[books.length - 1].authors}</h2>
							<h2>출판사 : {books[books.length - 1].publisher}</h2>
							<p>{books[books.length - 1].price}원</p>
							<p>{books[books.length - 1].contents}</p>
							<p>{books[books.length - 1].isbn}</p>
						</div>
					</>
				) : (
					books.map((el: BData) => (
						<div key={el.isbn}>
							<img src={el.thumbnail} alt={`책 ${el.title}의 이미지`} />
							<h2>{el.authors}</h2>
							<h2>출판사 : {el.publisher}</h2>
							<p>{el.price}원</p>
							<p>{el.contents}</p>
							<p>{el.isbn}</p>
						</div>
					))
				)
			) : (
				<>{books && books.length === 0 && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
