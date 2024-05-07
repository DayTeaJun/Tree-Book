import { useNavigate } from 'react-router-dom';
import errorImg from '../../Assets/No-img.svg';
import { BookItemProps } from '../../Types/bookType';
import { Box, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const BookItem = ({
	item,
	id,
	page,
	search,
	like,
	comment,
	publisher,
}: BookItemProps) => {
	const navigate = useNavigate();
	const isbn = item.isbn;
	const onMoveBookDetail = () => {
		if (like) {
			const likeIsbn =
				like.split(' ')[0] === '' ? like.split(' ')[1] : like.split(' ')[0];
			navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
		} else if (publisher) {
			console.log(publisher);
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
					{(item.rating && item.rating === 0) || (
						<Box sx={{ display: 'flex' }}>
							{Array.from({ length: item.rating as number }).map((_, index) => (
								<StarIcon key={index} fontSize='small' />
							))}
							{Array.from({
								length: (5 - (item.rating ?? 0)) as number,
							}).map((_, index) => (
								<StarOutlineIcon key={index} fontSize='small' />
							))}
						</Box>
					)}
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
					{comment}
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
			sx={{
				width: '140px',
				position: 'relative',
				borderRadius: '5px',
				padding: '10px',
				backgroundColor: 'background.hover',
				cursor: 'pointer',
				'&:hover': {
					transform: 'translateY(-0.5em)',
					transition: 'transform 0.5s',
					boxShadow:
						'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
				},
			}}
			onClick={onMoveBookDetail}
		>
			<Box
				sx={{
					width: '120px',
					textAlign: 'center',
					borderRadius: '10px',
				}}
			>
				{item.thumbnail ? (
					<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
				) : (
					<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
				)}
				<Box
					sx={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: '100%',
						height: '100%',
						borderRadius: '5px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '5px',
						padding: '15px',
						opacity: '0',
						'&:hover': {
							backgroundColor: 'background.hover',
							opacity: '0.9',
						},
					}}
				>
					<Typography
						component='h2'
						fontSize={'1em'}
						fontWeight={'bold'}
						sx={{
							width: '100%',
							textAlign: 'center',
							color: 'text.primary',
							marginTop: '5px',
							whiteSpace: 'normal',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 4,
							WebkitBoxOrient: 'vertical',
							wordBreak: 'keep-all',
							overflow: 'hidden',
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
							textAlign: 'center',
							color: 'text.secondary',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{item.authors.length > 1 ? item.authors.join(' | ') : item.authors}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default BookItem;
