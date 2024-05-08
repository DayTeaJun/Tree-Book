import { Box, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import errorImg from '../../Assets/No-img.svg';
import BookLikes from '../../Components/Books/BookLikes';
import { useParams } from 'react-router-dom';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Chart } from '../../Components/Rating/Chart';
import { avgRating } from '../../Utils/CalRating';
import StarIcon from '@mui/icons-material/Star';
import { StarRating } from '../../Components/Rating/Rating';

export const BookDetailItem = ({
	item,
	likedBook,
}: {
	item: BookData;
	likedBook: FirestoreDocument[];
}) => {
	const { id, search, page } = useParams<{
		id: string;
		search: string;
		page: string;
	}>();

	return (
		<>
			<Box
				component='section'
				sx={{ display: 'flex', gap: '20px', padding: '20px 0' }}
				key={item.url}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					<Box
						sx={{
							width: '150px',
							flexShrink: 1,
							textAlign: 'center',
							borderRadius: '10px',
							cursor: 'pointer',
							boxShadow: 'rgba(0, 0, 0, 0.5) 4.8px 4.8px 6.4px',
						}}
						onClick={() => {
							window.open(item.url);
						}}
					>
						{item.thumbnail ? (
							<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
						) : (
							<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
						)}
					</Box>

					<BookLikes
						item={item}
						id={id}
						search={search}
						page={page}
						likedBook={likedBook}
					/>
					{likedBook && likedBook[0] && likedBook[0].ratingBy !== undefined && (
						<Box
							sx={{
								width: '80%',
								margin: '0 auto',
								display: 'flex',
								gap: '5px',
								flexDirection: 'column',
								color: 'background.mark',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<StarRating
								rating={Math.floor(avgRating(likedBook[0].ratingBy) ?? 0)}
							/>

							<Typography
								component='p'
								fontSize='1em'
								fontWeight='bold'
								sx={{ display: 'flex', alignItems: 'center' }}
							>
								{`${(avgRating(likedBook[0].ratingBy) ?? 0).toFixed(1)} (${
									Object.keys(likedBook[0].ratingBy).length
								}명)`}
							</Typography>
						</Box>
					)}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<Typography component='h2' fontWeight='bold' fontSize='1.5em'>
						{item.title}
					</Typography>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							height: '180px',
						}}
					>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<Typography component='dl' sx={{ display: 'flex' }}>
								<Typography
									component='dt'
									sx={{
										flexShrink: 0,
										width: '80px',
										color: 'text.secondary',
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
									sx={{
										flexShrink: 0,
										width: '80px',
										color: 'text.secondary',
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

							<Typography component='dl' sx={{ display: 'flex' }}>
								<Typography
									component='dt'
									sx={{
										flexShrink: 0,
										width: '80px',
										color: 'text.secondary',
									}}
								>
									판매가
								</Typography>
								<Typography component='dd'>
									{item.price.toLocaleString('ko-KR')}원
								</Typography>
							</Typography>
							<Typography component='dl' sx={{ display: 'flex' }}>
								<Typography
									component='dt'
									sx={{
										flexShrink: 0,
										width: '80px',
										color: 'text.secondary',
									}}
								>
									ISBN
								</Typography>
								<Typography component='dd'>{item.isbn}</Typography>
							</Typography>
							<Typography component='dl' sx={{ display: 'flex' }}>
								<Typography
									component='dt'
									sx={{
										flexShrink: 0,
										width: '80px',
										color: 'text.secondary',
									}}
								>
									출판일
								</Typography>
								<Typography component='dd'>
									{item.datetime.substr(0, 10).replaceAll('-', '. ')}
								</Typography>
							</Typography>
						</Box>
						{likedBook &&
							likedBook.length > 0 &&
							likedBook[0] &&
							likedBook[0].ratingBy !== undefined && (
								<Box
									sx={{
										width: '50%',
										height: '100%',
										borderRadius: '5px',
										border: 'solid 3px',
										borderColor: 'background.btn',
										padding: '30px',
									}}
								>
									<Chart
										chartRating={likedBook[0].ratingBy}
										props='BookDetail'
									/>
								</Box>
							)}
					</Box>
					{item.contents !== (undefined || '') ? (
						<Typography
							component='dl'
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
							}}
						>
							<Typography
								component='dt'
								fontWeight='bold'
								fontSize='1.2em'
								sx={{
									borderBottom: '1px solid',
									paddingBottom: '10px',
									color: 'text.secondary',
								}}
							>
								책소개
							</Typography>
							<Typography
								component='dd'
								sx={{
									whiteSpace: 'normal',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
									wordBreak: 'keep-all',
									overflow: 'hidden',
								}}
							>
								{item.contents}...
							</Typography>
						</Typography>
					) : (
						<></>
					)}
				</Box>
			</Box>
		</>
	);
};
