import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import errorImg from '../../Assets/No-img.svg';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { BookData } from '../../Types/bookType';
import { useEffect, useState } from 'react';
import BookLikes from '../../Components/Books/BookLikes';
import Loading from '../../Components/LoadingSpinner/Loading';
import ToastPopup from '../../Components/Toast/Toast';
import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function BookDetail() {
	const { id, search, page } = useParams<{
		id: string;
		search: string;
		page: string;
	}>();
	const [item, setItem] = useState<BookData>();
	const { pathname } = useLocation();
	const [toast, setToast] = useState(false);
	const [message, setMessage] = useState('');

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', page, search],
		queryFn: () =>
			search &&
			(pathname.indexOf('/like') !== -1
				? getBooks(search, 1, page, 'isbn')
				: getBooks(search, 16, page, 'title')),
		enabled: !!search,
	});

	useEffect(() => {
		if (books) {
			const item: BookData = books.documents.find(
				(_: BookData, index: number) => index === (id && parseInt(id))
			);
			setItem(item);
		}
	}, [books]);

	if (isLoading) {
		return <Loading BackDrop={true} />;
	}

	return (
		<>
			<Box component='main' sx={{ display: 'flex', flexDirection: 'column' }}>
				{item && !isLoading ? (
					<>
						<Helmet>
							<title>{item.title} - TreeBook</title>
						</Helmet>
						<Box
							component='section'
							sx={{ display: 'flex', gap: '20px', padding: '20px 0' }}
							key={item.url}
						>
							<Box
								sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
							>
								<Box
									sx={{
										width: '9em',
										flexShrink: 1,
										textAlign: 'center',
										borderRadius: '10px',
									}}
								>
									{item.thumbnail ? (
										<img
											src={item.thumbnail}
											alt={`책 ${item.title}의 이미지`}
										/>
									) : (
										<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
									)}
								</Box>

								<Typography
									component='a'
									textAlign='center'
									fontSize='0.8em'
									fontWeight='bold'
									color='text.primary'
									sx={{ cursor: 'pointer' }}
									onClick={() => {
										window.open(item.url);
									}}
								>
									다음 검색으로 이동
								</Typography>
							</Box>

							<Box
								sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
							>
								<Box
									sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
								>
									<Typography
										component='h2'
										fontWeight='bold'
										fontSize='1.3em'
										sx={{ marginBottom: '5px' }}
									>
										{item.title}
									</Typography>
									<BookLikes
										item={item}
										id={id}
										search={search}
										page={page}
										setMessage={setMessage}
										setToast={setToast}
									/>
								</Box>
								<Typography component='dl' sx={{ display: 'flex' }}>
									<Typography
										component='dt'
										fontWeight='bold'
										sx={{
											flexShrink: 0,
											width: '80px',
											marginRight: '10px',
											borderRight: 'solid 2px #ccc',
										}}
									>
										작가
									</Typography>
									<Typography component='dd'>
										{item.authors.length !== 0
											? item.authors.length > 1
												? item.authors.join(' | ')
												: item.authors
											: '미상'}
									</Typography>
								</Typography>
								<Typography component='dl' sx={{ display: 'flex' }}>
									<Typography
										component='dt'
										fontWeight='bold'
										sx={{
											flexShrink: 0,
											width: '80px',
											marginRight: '10px',
											borderRight: 'solid 2px #ccc',
										}}
									>
										출판사
									</Typography>
									<Typography component='dd'>
										{item.publisher !== (undefined || '')
											? item.publisher
											: '미상'}
									</Typography>
								</Typography>
								{item.contents !== (undefined || '') ? (
									<Typography component='dl' sx={{ display: 'flex' }}>
										<Typography
											component='dt'
											fontWeight='bold'
											sx={{
												flexShrink: 0,
												width: '80px',
												marginRight: '10px',
												borderRight: 'solid 2px #ccc',
											}}
										>
											내용
										</Typography>
										<Typography
											component='dd'
											sx={{
												overflow: 'hidden',
												whiteSpace: 'normal',
												textOverflow: 'ellipsis',
												display: '-webkit-box',
												WebkitLineClamp: 3,
												WebkitBoxOrient: 'vertical',
												wordBreak: 'keep-all',
											}}
										>
											{item.contents}
										</Typography>
									</Typography>
								) : (
									<></>
								)}

								<Typography component='dl' sx={{ display: 'flex' }}>
									<Typography
										component='dt'
										fontWeight='bold'
										sx={{
											flexShrink: 0,
											width: '80px',
											marginRight: '10px',
											borderRight: 'solid 2px #ccc',
										}}
									>
										가격
									</Typography>
									<Typography component='dd'>
										{item.price.toLocaleString('ko-KR')}원
									</Typography>
								</Typography>
								<Typography component='dl' sx={{ display: 'flex' }}>
									<Typography
										component='dt'
										fontWeight='bold'
										sx={{
											flexShrink: 0,
											width: '80px',
											marginRight: '10px',
											borderRight: 'solid 2px #ccc',
										}}
									>
										ISBN
									</Typography>
									<Typography component='dd'>{item.isbn}</Typography>
								</Typography>
								<Typography component='dl' sx={{ display: 'flex' }}>
									<Typography
										component='dt'
										fontWeight='bold'
										sx={{
											flexShrink: 0,
											width: '80px',
											marginRight: '10px',
											borderRight: 'solid 2px #ccc',
										}}
									>
										출판일
									</Typography>
									<Typography component='dd'>
										{item.datetime.substr(0, 10).replaceAll('-', '. ')}
									</Typography>
								</Typography>
							</Box>
						</Box>
						<CommentForm item={item} />
					</>
				) : (
					<>{item && <h2>not found</h2>}</>
				)}
				{toast && (
					<ToastPopup setToast={setToast} message={message} position={'top'} />
				)}
			</Box>
		</>
	);
}
