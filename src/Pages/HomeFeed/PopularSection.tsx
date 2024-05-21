import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getBestcomments } from '../../Api/Firebase/getBestBook';
import { BookData } from '../../Types/bookType';
import { useNavigate } from 'react-router-dom';
import errorImg from '../../Assets/No-img.svg';
import StarIcon from '@mui/icons-material/Star';
import { avgRating } from '../../Utils/CalRating';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { PopularSectionSkeleton } from './PopularSection.skeleton';

export const PopularSection = () => {
	const navigate = useNavigate();
	const { isDownLG, isDownMD } = useMediaQueries();

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks', 'ratingBy'],
		queryFn: () => getBestcomments('likedBook', 'ratingBy', 9),
	});

	const onMoveBookDetail = (isbn: string) => {
		const likeIsbn =
			isbn.split(' ')[0] === '' ? isbn.split(' ')[1] : isbn.split(' ')[0];
		navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
	};

	return (
		<Box
			component='section'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<Typography
				component='p'
				fontWeight='bold'
				fontSize='1.5em'
				sx={{
					color: 'text.primary',
					paddingBottom: '10px',
				}}
			>
				리뷰가 많은 책들
			</Typography>
			<Box
				component='ul'
				sx={{
					display: 'flex',
					flexDirection: `${isDownLG ? 'column' : 'row'}`,
					flexFlow: 'wrap',
					width: '100%',
					minHeight: '400px',
				}}
			>
				{isLoading
					? Array.from({ length: 9 }).map((_, index) => (
							<PopularSectionSkeleton key={index} />
					  ))
					: likedBooks &&
					  (likedBooks as BookData[]).map((item: BookData, index: number) => (
							<Box
								component='li'
								key={index}
								sx={{
									width: `${
										(isDownMD && '100%') ||
										(isDownLG && 'calc((100% - 20px) / 2)') ||
										'calc((100% - 20px) / 3)'
									}`,
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
										sx={{ width: '5%', flexShrink: 0 }}
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
											width: 'calc(90% - 140px)',
											display: 'flex',
											flexDirection: 'column',
											gap: '3px',
										}}
									>
										<Typography
											fontSize='1.1em'
											fontWeight={'bold'}
											sx={{
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
										{item.ratingBy && (
											<>
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
														{`${(avgRating(item.ratingBy) ?? 0).toFixed(1)} (${
															Object.keys(item.ratingBy).length
														})`}
													</Typography>
												</Box>
											</>
										)}
									</Box>
								</Box>
							</Box>
					  ))}
			</Box>
		</Box>
	);
};
