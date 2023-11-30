import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';

export default function BookDetail() {
	const BD: string = useParams().bookDetail || '';
	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', BD],
		queryFn: () => getBooks(BD),
		enabled: !!BD,
	});

	const onWebsiteView = () => {
		window.open(books[books.length - 1].url);
	};

	return (
		<>
			{books && books.length !== 0 ? (
				<>
					<div key={books[books.length - 1].isbn}>
						<img
							src={books[books.length - 1].thumbnail}
							alt={`책 ${books[books.length - 1].title}의 이미지`}
						/>
						<h2>{books[books.length - 1].authors}</h2>
						<h2>출판사 : {books[books.length - 1].publisher}</h2>
						<p>{books[books.length - 1].price}원</p>
						<p>내용 : {books[books.length - 1].contents}</p>
						<p>{books[books.length - 1].isbn}</p>
						<p>출판일 : {books[books.length - 1].datetime.substr(0, 10)}</p>
						<button onClick={onWebsiteView}>다음 검색으로 이동</button>
					</div>
				</>
			) : (
				<>{books && books.length === 0 && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
