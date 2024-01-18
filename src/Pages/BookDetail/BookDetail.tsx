import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BookImg } from '../../Components/Books/Books/books.style';
import errorImg from '../../Assets/No-img.svg';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { D } from './bookDetail.style';
import { BData } from '../../Types/bookData';
import { useEffect, useState } from 'react';

export default function BookDetail() {
	const { id, search } = useParams<{ id: string; search: string }>();
	const [bookItem, setBookItem] = useState<BData>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', search],
		queryFn: () => getBooks(search!),
		enabled: !!search,
	});

	useEffect(() => {
		const bookItem: BData = books.find(
			(_: BData, index: number) => index === parseInt(id!)
		);
		setBookItem(bookItem);
	}, [books]);

	const onWebsiteView = () => {
		window.open(books.url);
	};

	const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.target as HTMLImageElement;
		target.src = errorImg;
	};

	return (
		<D.Main>
			{bookItem ? (
				<>
					<D.Section key={bookItem.isbn}>
						<D.Container>
							<BookImg
								src={bookItem.thumbnail}
								alt={`책 ${bookItem.title}의 이미지`}
								onError={onErrorImg}
							/>
							<D.Alink onClick={onWebsiteView}>다음 검색으로 이동</D.Alink>
						</D.Container>

						<D.Container>
							<D.H2>{bookItem.title}</D.H2>
							<D.Dl>
								<D.Dt>작가</D.Dt>
								<D.Dd>
									{bookItem.authors !== undefined || ''
										? bookItem.authors
										: '미상'}
								</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판사</D.Dt>
								<D.Dd>
									{bookItem.publisher !== (undefined || '')
										? bookItem.publisher
										: '미상'}
								</D.Dd>
							</D.Dl>
							{bookItem.contents !== (undefined || '') ? (
								<D.Dl>
									<D.Dt>내용</D.Dt>
									<D.Dd>{bookItem.contents}</D.Dd>
								</D.Dl>
							) : (
								<></>
							)}

							<D.Dl>
								<D.Dt>가격</D.Dt>
								<D.Dd>{bookItem.price}원</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>ISBN</D.Dt>
								<D.Dd>{bookItem.isbn}</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판일</D.Dt>
								<D.Dd>{bookItem.datetime.substr(0, 10)}</D.Dd>
							</D.Dl>
						</D.Container>
					</D.Section>
				</>
			) : (
				<>{bookItem && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}

			<CommentForm />
		</D.Main>
	);
}
