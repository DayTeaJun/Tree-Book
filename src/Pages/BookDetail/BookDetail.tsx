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
						<div>
							<img
								src={books[0].thumbnail}
								alt={`책 ${books[0].title}의 이미지`}
							/>
							<a onClick={onWebsiteView}>다음 검색으로 이동</a>
						</div>
						<div>
							<h2>{books[0].title}</h2>
							<dl>
								<dt>작가</dt>
								<dd>{books[0].authors}</dd>
							</dl>
							<dl>
								<dt>출판사</dt>
								<dd>{books[0].publisher}</dd>
							</dl>
							<dl>
								<dt>내용</dt>
								<dd>{books[0].contents}</dd>
							</dl>
							<dl>
								<dt>가격</dt>
								<dd>{books[0].price}원</dd>
							</dl>
							<dl>
								<dt>ISBN</dt>
								<dd>{books[0].isbn}</dd>
							</dl>
							<dl>
								<dt>출판일</dt>
								<dd>{books[0].datetime.substr(0, 10)}</dd>
							</dl>
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
