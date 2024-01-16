import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BookImg } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { D } from './bookDetail.style';

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
		<D.Main>
			{books && books.length !== 0 ? (
				<>
					<D.Section key={books[0].isbn}>
						<D.Container>
							<BookImg
								src={books[0].thumbnail}
								alt={`책 ${books[0].title}의 이미지`}
								onError={onErrorImg}
							/>
							<D.Alink onClick={onWebsiteView}>다음 검색으로 이동</D.Alink>
						</D.Container>

						<D.Container>
							<D.H2>{books[0].title}</D.H2>
							<D.Dl>
								<D.Dt>작가</D.Dt>
								<D.Dd>
									{books[0].author !== undefined || ''
										? books[0].authors
										: '미상'}
								</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판사</D.Dt>
								<D.Dd>
									{books[0].publisher !== (undefined || '')
										? books[0].publisher
										: '미상'}
								</D.Dd>
							</D.Dl>
							{books[0].contents !== (undefined || '') ? (
								<D.Dl>
									<D.Dt>내용</D.Dt>
									<D.Dd>{books[0].contents}</D.Dd>
								</D.Dl>
							) : (
								<></>
							)}

							<D.Dl>
								<D.Dt>가격</D.Dt>
								<D.Dd>{books[0].price}원</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>ISBN</D.Dt>
								<D.Dd>{books[0].isbn}</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판일</D.Dt>
								<D.Dd>{books[0].datetime.substr(0, 10)}</D.Dd>
							</D.Dl>
						</D.Container>
					</D.Section>
				</>
			) : (
				<>{books && books.length === 0 && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}

			<CommentForm />
		</D.Main>
	);
}
