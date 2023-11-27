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
			{books && books.length !== 0 ? (
				<>
					{books.map((el: BData) => (
						<div key={el.isbn}>
							<img src={el.thumbnail} alt={`책 ${el.title}의 이미지`} />
							<h2>{el.authors}</h2>
							<h2>출판사 : {el.publisher}</h2>
							<p>{el.price}원</p>
							<p>{el.contents}</p>
							<p>{el.isbn}</p>
						</div>
					))}
				</>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
