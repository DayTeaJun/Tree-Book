import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { Books } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';

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

	const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.target as HTMLImageElement;
		target.src = errorImg;
	};

	return (
		<>
			{books && books.length !== 0 ? (
				<>
					<Books $detail={true} key={books[0].isbn}>
						<div>
							<img
								src={books[0].thumbnail}
								alt={`책 ${books[0].title}의 이미지`}
								onError={onErrorImg}
							/>
							<a onClick={onWebsiteView}>다음 검색으로 이동</a>
						</div>

						<div>
							<h2>{books[0].title}</h2>
							<dl>
								<dt>작가</dt>
								<dd>
									{books[0].author !== undefined || ''
										? books[0].authors
										: '미상'}
								</dd>
							</dl>
							<dl>
								<dt>출판사</dt>
								<dd>
									{books[0].publisher !== (undefined || '')
										? books[0].publisher
										: '미상'}
								</dd>
							</dl>
							{books[0].contents !== (undefined || '') ? (
								<dl>
									<dt>내용</dt>
									<dd>{books[0].contents}</dd>
								</dl>
							) : (
								<></>
							)}

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
					</Books>
				</>
			) : (
				<>{books && books.length === 0 && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
