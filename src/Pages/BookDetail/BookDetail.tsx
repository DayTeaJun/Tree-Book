import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import errorImg from '../../Assets/No-img.svg';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { D } from './bookDetail.style';
import { BookData } from '../../Types/bookType';
import { useEffect, useState } from 'react';
import BookLikes from '../../Components/Books/BookLikes';
import { Loading } from '../../Components/LoadingSpinner/Loading';

export default function BookDetail() {
	const { id, search, page } = useParams<{
		id: string;
		search: string;
		page: string;
	}>();
	const [item, setItem] = useState<BookData>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', search],
		queryFn: () => getBooks(search!, 14, page),
		enabled: !!search,
	});

	useEffect(() => {
		if (books) {
			const item: BookData = books.find(
				(_: BookData, index: number) => index === parseInt(id!)
			);
			setItem(item);
		}
	}, [books]);

	if (isLoading) {
		return <Loading BackDrop={true} />;
	}

	return (
		<D.Main>
			{item && !isLoading ? (
				<>
					<D.Section key={item.isbn}>
						<D.Container>
							{item.thumbnail ? (
								<D.ContainerImg>
									<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
								</D.ContainerImg>
							) : (
								<D.ContainerImg>
									<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
								</D.ContainerImg>
							)}
							<D.Alink
								onClick={() => {
									window.open(item.url);
								}}
							>
								다음 검색으로 이동
							</D.Alink>
						</D.Container>

						<D.Container>
							<D.ContainerH2Likes>
								<D.H2>{item.title}</D.H2>
								<BookLikes item={item} id={id} search={search} page={page} />
							</D.ContainerH2Likes>
							<D.Dl>
								<D.Dt>작가</D.Dt>
								<D.Dd>
									{item.authors !== undefined || ''
										? item.authors.length > 1
											? item.authors.join(' | ')
											: item.authors
										: '미상'}
								</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판사</D.Dt>
								<D.Dd>
									{item.publisher !== (undefined || '')
										? item.publisher
										: '미상'}
								</D.Dd>
							</D.Dl>
							{item.contents !== (undefined || '') ? (
								<D.Dl>
									<D.Dt>내용</D.Dt>
									<D.Dd>{item.contents}</D.Dd>
								</D.Dl>
							) : (
								<></>
							)}

							<D.Dl>
								<D.Dt>가격</D.Dt>
								<D.Dd>{item.price.toLocaleString('ko-KR')}원</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>ISBN</D.Dt>
								<D.Dd>{item.isbn}</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판일</D.Dt>
								<D.Dd>{item.datetime.substr(0, 10).replaceAll('-', '. ')}</D.Dd>
							</D.Dl>
						</D.Container>
					</D.Section>
					<CommentForm />
				</>
			) : (
				<>{item && <h2>not found</h2>}</>
			)}
		</D.Main>
	);
}
