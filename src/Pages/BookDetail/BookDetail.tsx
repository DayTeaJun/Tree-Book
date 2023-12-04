import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BookDetailSection } from './bookDetail.style';

export default function BookDetail() {
	const BD: string = useParams().bookDetail || '';
	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', BD],
		queryFn: () => getBooks(BD),
		enabled: !!BD,
	});

	const onWebsiteView = () => {
		window.open(books[0].url);
	};

	return (
		<>
			{books && books.length !== 0 ? (
				<>
					<BookDetailSection key={books[0].isbn}>
						<img
							src={books[0].thumbnail}
							alt={`책 ${books[0].title}의 이미지`}
						/>
						<div>
							<h2>작가 | {books[0].authors}</h2>
							<h2>출판사 | {books[0].publisher}</h2>
							<p>가격 | {books[0].price}원</p>
							<p>내용 | {books[0].contents}</p>
							<p>ISBN | {books[0].isbn}</p>
							<p>출판일 | {books[0].datetime.substr(0, 10)}</p>
							<a onClick={onWebsiteView}>다음 검색으로 이동</a>
						</div>
					</BookDetailSection>
				</>
			) : (
				<>{books && books.length === 0 && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
