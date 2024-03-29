import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { Box, Paper, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function HomeFeed() {
	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks'],
		queryFn: () => getLikedBooks('home'),
	});

	return (
		<>
			<Box
				component='main'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					padding: '20px 50px',
					gap: '50px',
				}}
			>
				<Box
					component='section'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						width: '80%',
						height: '100%',
						margin: '0 auto',
					}}
				>
					<Carousel
						animation='slide'
						duration={600}
						height='300px'
						sx={{
							width: '100%',
						}}
					>
						{likedBooks &&
							(likedBooks as BookData[]).map(
								(item: BookData, index: number) => (
									<Paper
										key={index}
										sx={{
											width: '100%',
											height: '100%',
											display: 'flex',
											justifyContent: 'space-between',
											padding: '30px 70px',
											gap: '20px',
											borderBottom: '0.5px solid #ccc',
											borderRadius: '0',
											background: 'inherit',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'space-between',
												width: '70%',
											}}
										>
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
												{item.contents.length > 1
													? `『 ${item.contents} 』`
													: ''}
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
													: item.authors}{' '}
												| {item.publisher}
											</Typography>
										</Box>
										<Box
											sx={{
												width: 'calc(30% - 20px)',
												marginLeft: 'auto',
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
								)
							)}
					</Carousel>
				</Box>

				<Box
					component='section'
					sx={{
						display: 'flex',
						width: '100%',
						height: '100%',
						gap: '20px',
						flexWrap: 'wrap',
						paddingTop: '20px',
						justifyContent: 'center',
					}}
				>
					{likedBooks && (
						<>
							{(likedBooks as BookData[]).map(
								(item: BookData, index: number) => (
									<BookItem item={item} key={index} like={item.isbn}></BookItem>
								)
							)}
						</>
					)}
					{isLoading && (
						<>
							{Array.from({ length: 12 }).map((_, index) => (
								<BookItemSkeleton key={index} />
							))}
						</>
					)}
				</Box>
				{likedBooks && likedBooks.length === 0 && <h2>not found</h2>}
			</Box>
		</>
	);
}
