import { Box, Paper, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import Carousel from 'react-material-ui-carousel';
import { useQuery } from '@tanstack/react-query';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { useNavigate } from 'react-router-dom';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { Shimmer } from '../../Styles/Common';

const BestBook = () => {
	const navigate = useNavigate();

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['bestBook'],
		queryFn: () => getLikedBooks('best'),
	});

	const onMoveBookDetail = (isbn: string) => {
		const likeIsbn =
			isbn.split(' ')[0] === '' ? isbn.split(' ')[1] : isbn.split(' ')[0];
		navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
	};

	const { isDownSM } = useMediaQueries();

	return (
		<Carousel
			animation='slide'
			duration={1000}
			height={`${isDownSM ? '280px' : '300px'}`}
			autoPlay={false}
			sx={{
				width: '100%',
				margin: '0 auto',
			}}
			navButtonsAlwaysVisible={true}
		>
			{isLoading ? (
				<Paper
					sx={{
						width: '100%',
						height: 'calc(100% + 18px)',
						display: 'flex',
						flexDirection: `${isDownSM ? 'column' : 'row'}`,
						padding: '30px 70px',
						boxShadow: 'none',
						borderRadius: '0',
						background: 'inherit',
						cursor: 'pointer',
					}}
				>
					<Box
						sx={{
							width: '100%',
							height: '100%',
							overflow: 'hidden',
							backgroundColor: 'background.book',
							padding: '30px 70px',
						}}
					/>
				</Paper>
			) : (
				likedBooks &&
				(likedBooks as BookData[]).map((item: BookData, index: number) => (
					<Paper
						key={index}
						sx={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: `${isDownSM ? 'column' : 'row'}`,
							padding: '30px 70px',
							boxShadow: 'none',
							borderRadius: '0',
							background: 'inherit',
							cursor: 'pointer',
						}}
						onClick={() => onMoveBookDetail(item.isbn)}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: `${!isDownSM && 'space-between'}`,
								width: '70%',
							}}
						>
							{!isDownSM && (
								<>
									<Box
										sx={{
											backgroundColor: 'background.book',
											padding: '2px 8px',
											borderRadius: '5px',
											display: 'inline-block',
											width: 'fit-content',
											marginBottom: '-30px',
										}}
									>
										<Typography
											component='p'
											fontSize='1em'
											fontWeight='bold'
											color='text.primary'
										>
											Best
										</Typography>
									</Box>

									<Typography
										component='h3'
										fontSize='1.5em'
										fontWeight='bold'
										sx={{
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											textDecoration: 'underline',
											textDecorationColor: '#ccc',
											textUnderlinePosition: 'under',
										}}
									>
										{item.title}
									</Typography>
									<Typography
										component='p'
										fontSize='1.1em'
										fontWeight='bold'
										sx={{
											whiteSpace: 'normal',
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical',
											wordBreak: 'keep-all',
											overflow: 'hidden',
										}}
									>
										{item.contents.length > 1 ? `『 ${item.contents} 』` : ''}
									</Typography>

									<Typography
										component='p'
										fontSize={'1.1em'}
										fontWeight={'bold'}
										sx={{
											color: 'text.secondary',
										}}
									>
										{item.authors.length > 1
											? item.authors.join(' | ')
											: item.authors}
										{item.authors.length !== 0 && ' | '}
										{item.publisher}
									</Typography>
								</>
							)}
						</Box>

						<Box
							sx={{
								marginLeft: `${!isDownSM && 'auto'}`,
								margin: `${isDownSM && '0 auto'}`,
							}}
						>
							<img
								style={{
									width: '150px',
									boxShadow: 'rgba(0, 0, 0, 0.5) 4.8px 4.8px 6.4px',
								}}
								src={item.thumbnail}
								alt={`책 ${item.title}의 이미지`}
							/>
						</Box>
					</Paper>
				))
			)}
		</Carousel>
	);
};

export default BestBook;
