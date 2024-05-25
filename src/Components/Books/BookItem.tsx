import { useNavigate } from 'react-router-dom';
import errorImg from '../../Assets/No-img.svg';
import { BookItemProps } from '../../Types/bookType';
import { Box, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { StarRating } from '../Rating/Rating';
import { avgRating } from '../../Utils/CalRating';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const BookItem = ({
	item,
	id,
	page,
	search,
	like,
	comment,
	publisher,
	profile,
}: BookItemProps) => {
	const { user } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const isbn = item.isbn;
	const onMoveBookDetail = () => {
		if (like) {
			const likeIsbn =
				like.split(' ')[0] === '' ? like.split(' ')[1] : like.split(' ')[0];
			navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
		} else if (publisher) {
			if (publisher.includes('/')) {
				navigate(`/search/publisher/${publisher.replace('/', '_')}/1/${id}`, {
					state: { isbn },
				});
			} else {
				navigate(`/search/publisher/${publisher}/1/${id}`, { state: { isbn } });
			}
		} else {
			navigate(`/search/${search}/${page}/${id}`, { state: { isbn } });
		}
	};

	if (comment) {
		return (
			<Box
				component='li'
				onClick={onMoveBookDetail}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexShrink: 0,
					gap: '5px',
					cursor: 'pointer',
					width: '95%',
					padding: '10px',
					borderRadius: '5px',
					borderColor: 'text.primary',
					border: '1px solid',
					transition: '0.5s',
					'&:hover': {
						backgroundColor: 'background.hover',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '20px',
					}}
				>
					<Typography
						component='h2'
						fontSize={'1.2em'}
						fontWeight={'bold'}
						sx={{
							color: 'text.primary',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							textDecorationLine: 'none',
						}}
					>
						{item.title}
					</Typography>
					{item.rating && <StarRating rating={item.rating} />}
				</Box>

				<Divider
					sx={{
						width: '100%',
						margin: '5px 0',
					}}
				/>

				<Typography
					component='h2'
					fontSize={'1em'}
					fontWeight={'500'}
					sx={{
						color: 'text.primary',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						textDecorationLine: 'none',
					}}
				>
					{user?.displayName !== item.displayName && item?.checked
						? '《 스포일러가 포함된 리뷰입니다. 》'
						: comment}
				</Typography>
				<Divider
					sx={{
						width: '100%',
						margin: '5px 0',
					}}
				/>

				<Typography
					component='p'
					fontSize={'0.8em'}
					sx={{
						color: 'text.secondary',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{item.createdTime?.toDate().toLocaleString()}
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			component='li'
			sx={{
				width: '125px',
				borderRadius: '5px',
				cursor: 'pointer',
			}}
			onClick={onMoveBookDetail}
		>
			<Box
				sx={{
					width: '125px',
				}}
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
						{item.authors.length > 1 ? item.authors.join(' | ') : item.authors}
					</Typography>
					{!profile && (
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
									? `${(avgRating(item.ratingBy) ?? 0).toFixed(1)} (${
											Object.keys(item.ratingBy).length
									  })`
									: '0.0 (0)'}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default BookItem;
