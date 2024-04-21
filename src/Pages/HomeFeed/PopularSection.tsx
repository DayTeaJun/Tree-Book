import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getBestcomments } from '../../Api/Firebase/getBestComments';
import { BookData } from '../../Types/bookType';
import { useNavigate } from 'react-router-dom';
import errorImg from '../../Assets/No-img.svg';
import BookItem from '../../Components/Books/BookItem';

interface PopularSectionProps {
	props: 'commentTotalNumber' | 'views';
}

export const PopularSection = ({ props }: PopularSectionProps) => {
	const navigate = useNavigate();

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks', props],
		queryFn: () =>
			getBestcomments('LikedBook', props, props === 'views' ? 6 : 9),
	});

	const onMoveBookDetail = (isbn: string) => {
		const likeIsbn =
			isbn.split(' ')[0] === '' ? isbn.split(' ')[1] : isbn.split(' ')[0];
		navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
	};

	return (
		<>
			<Typography
				component='h2'
				fontWeight='bold'
				fontSize='1.5em'
				sx={{
					color: 'text.primary',
				}}
			>
				{`${props === 'views' ? '많이 찾고 있는 책들' : '리뷰가 많은 책들'}`}
			</Typography>
			{props === 'commentTotalNumber' ? (
				<Box
					component='ul'
					sx={{
						display: 'flex',
						flexFlow: 'column wrap',
						width: '100%',
						height: '400px',
					}}
				>
					{likedBooks &&
						(likedBooks as BookData[]).map((item: BookData, index: number) => (
							<Box
								component='li'
								key={index}
								sx={{
									width: 'calc((100% - 20px) / 3)',
									height: '120px',
									display: 'flex',
									color: 'text.primary',
									fontWeight: 'bold',
									paddingRight: '20px',
									marginBottom: '10px',
								}}
							>
								<Box
									sx={{
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										gap: '20px',
									}}
								>
									<Typography
										fontWeight='bold'
										fontSize='1.1em'
										sx={{ flexShrink: 0 }}
									>
										{index + 1}
									</Typography>
									<Box
										sx={{
											width: '80px',
											borderRadius: '5px',
											cursor: 'pointer',
											overflow: 'hidden',
											flexShrink: 0,
										}}
										onClick={() => onMoveBookDetail(item.isbn)}
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
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Typography
											fontSize='1.1em'
											fontWeight={'bold'}
											sx={{
												width: '200px',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												cursor: 'pointer',
												whiteSpace: 'nowrap',
												'&:hover': {
													textDecoration: 'underline',
													textDecorationColor: '#ccc',
													textUnderlinePosition: 'under',
												},
											}}
											onClick={() => onMoveBookDetail(item.isbn)}
										>
											{item.title}
										</Typography>
										<Typography
											component='p'
											fontSize={'0.9em'}
											fontWeight={'bold'}
											sx={{
												color: 'text.secondary',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
											}}
										>
											{item.authors.length > 1
												? item.authors.join(' | ')
												: item.authors}
										</Typography>
									</Box>
									<Typography
										fontSize={'0.9em'}
										sx={{
											flexShrink: 0,
											color: 'text.secondary',
											marginLeft: 'auto',
										}}
									>
										[{item.commentTotalNumber ? item.commentTotalNumber : 0}]
									</Typography>
								</Box>
							</Box>
						))}
				</Box>
			) : (
				<>
					{
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								borderRadius: '10px',
							}}
						>
							<Typography
								component='h3'
								fontSize='1.1em'
								fontWeight='bold'
								color='text.primary'
								sx={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							></Typography>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									gap: '30px',
								}}
							>
								{likedBooks &&
									(likedBooks as BookData[]).map((item: BookData) => (
										<BookItem
											item={item}
											page={item.page}
											id={item.id}
											search={item.search}
											key={item.url}
											like={item.isbn}
										></BookItem>
									))}
							</Box>
						</Box>
					}
				</>
			)}
		</>
	);
};
