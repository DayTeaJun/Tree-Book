import { Box, Paper, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import Carousel from 'react-material-ui-carousel';
import { useQuery } from '@tanstack/react-query';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { getBestcomments } from '../../Api/Firebase/getBestBook';
import StarIcon from '@mui/icons-material/Star';
import errorImg from '../../Assets/No-img.svg';
import { useNavigate } from 'react-router-dom';
import { avgRating } from '../../Utils/CalRating';
import { FirestoreDocument } from '../../Types/firestoreType';

const BestView = () => {
	const navigate = useNavigate();
	const { isDownSM, isDownMD } = useMediaQueries();
	const itemsPerPage = isDownSM ? 3 : isDownMD ? 4 : 6;

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks'],
		queryFn: () => getBestcomments('likedBook', 'views', 12),
	});

	const chunkArray = (arr: FirestoreDocument[], chunkSize: number) => {
		const chunkedArray = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			chunkedArray.push(arr.slice(i, i + chunkSize));
		}
		return chunkedArray;
	};

	const chunkedLikedBooks = likedBooks && chunkArray(likedBooks, itemsPerPage);

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
				많이 찾고 있는 책들
			</Typography>
			<Carousel
				animation='slide'
				duration={500}
				autoPlay={false}
				sx={{
					width: '100%',
				}}
				navButtonsAlwaysVisible={true}
				cycleNavigation={false}
				indicators={false}
			>
				{chunkedLikedBooks &&
					chunkedLikedBooks.map((_, index: number) => (
						<Paper
							key={index}
							sx={{
								width: '100%',
								minHeight: isDownSM ? '220px' : isDownMD ? '260px' : '250px',
								display: 'flex',
								alignItems: 'center',
								gap: '20px',
								boxShadow: 'none',
								borderRadius: '0',
								background: 'inherit',
								cursor: 'pointer',
								padding: '0 30px',
							}}
						>
							{chunkedLikedBooks &&
								(chunkedLikedBooks[index] as BookData[]).map(
									(item: BookData, index: number) => (
										<Box
											sx={{
												width: isDownSM
													? 'calc((100% - 40px) / 3)'
													: isDownMD
													? 'calc((100% - 60px) / 4)'
													: 'calc((100% - 100px) / 6)',
												borderRadius: '5px',
												cursor: 'pointer',
											}}
											key={index}
											onClick={() => onMoveBookDetail(item.isbn)}
										>
											{item.thumbnail ? (
												<img
													style={{
														borderRadius: '5px',
														boxShadow:
															'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
													}}
													src={item.thumbnail}
													alt={`책 ${item.title}의 이미지`}
												/>
											) : (
												<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
											)}
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												<Typography
													component='h2'
													fontSize={'1em'}
													fontWeight={'bold'}
													sx={{
														width: '100%',
														color: 'text.primary',
														marginTop: '5px',
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														'&:hover': {
															textDecoration: 'underline',
															textDecorationColor: '#ccc',
															textUnderlinePosition: 'under',
														},
													}}
												>
													{item.title}
												</Typography>

												<Typography
													component='p'
													fontSize={'0.9em'}
													fontWeight={'bold'}
													sx={{
														width: '100%',
														color: 'text.secondary',
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
													}}
												>
													{item.authors.length > 0
														? item.authors.length > 1
															? item.authors.join(' | ')
															: item.authors[0]
														: '　'}
												</Typography>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														gap: '5px',
													}}
												>
													<StarIcon sx={{ fontSize: '1em' }} />
													<Typography
														component='p'
														fontSize={'0.9em'}
														fontWeight={'bold'}
														sx={{
															color: 'text.secondary',
														}}
													>
														{item.ratingBy
															? `${(avgRating(item.ratingBy) ?? 0).toFixed(
																	1
															  )} (${Object.keys(item.ratingBy).length})`
															: '0.0 (0)'}
													</Typography>
												</Box>
											</Box>
										</Box>
									)
								)}
						</Paper>
					))}
			</Carousel>
		</>
	);
};

export default BestView;
