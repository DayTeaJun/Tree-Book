import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import errorImg from '../../Assets/No-img.svg';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { D } from './bookDetail.style';
import { BData } from '../../Types/bookData';
import { useEffect, useState } from 'react';
import { ContainerBookImg } from '../../Components/Books/bookItem.style';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function BookDetail() {
	const { id, search } = useParams<{ id: string; search: string }>();
	const [bookItem, setBookItem] = useState<BData>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', search],
		queryFn: () => getBooks(search!),
		enabled: !!search,
	});

	useEffect(() => {
		if (!isLoading && books) {
			const bookItem: BData = books.find(
				(_: BData, index: number) => index === parseInt(id!)
			);
			setBookItem(bookItem);
		}
	}, [books]);

	return (
		<D.Main>
			{bookItem ? (
				<>
					<D.Section key={bookItem.isbn}>
						<D.Container>
							{bookItem.thumbnail ? (
								<ContainerBookImg>
									<img
										src={bookItem.thumbnail}
										alt={`책 ${bookItem.title}의 이미지`}
									/>
								</ContainerBookImg>
							) : (
								<ContainerBookImg>
									<img src={errorImg} alt={`책 ${bookItem.title}의 이미지`} />
								</ContainerBookImg>
							)}
							<D.Alink
								onClick={() => {
									window.open(bookItem.url);
								}}
							>
								다음 검색으로 이동
							</D.Alink>
						</D.Container>

						<D.Container>
							<D.ContainerH2Likes>
								<D.H2>{bookItem.title}</D.H2>
								<D.Likes>
									<FavoriteBorderIcon />
								</D.Likes>
							</D.ContainerH2Likes>
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
								<D.Dd>{bookItem.price.toLocaleString('ko-KR')}원</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>ISBN</D.Dt>
								<D.Dd>{bookItem.isbn}</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판일</D.Dt>
								<D.Dd>
									{bookItem.datetime.substr(0, 10).replaceAll('-', '. ')}
								</D.Dd>
							</D.Dl>
						</D.Container>
					</D.Section>
					<CommentForm />
				</>
			) : (
				<>{bookItem && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}
		</D.Main>
	);
}
