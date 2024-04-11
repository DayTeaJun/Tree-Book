import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getBestcomments } from '../../Api/Firebase/getBestComments';
import { BookData } from '../../Types/bookType';
import { useNavigate } from 'react-router-dom';

export const PopularSection = () => {
	const navigate = useNavigate();

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks'],
		queryFn: () => getBestcomments('BooksLikes'),
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
				width: '50%',
				height: '100%',
				border: '1px solid #ccc',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<Typography
				component='h2'
				fontWeight='bold'
				fontSize='1.2em'
				sx={{ textAlign: 'center', marginBottom: '10px' }}
			>
				실시간 핫 코멘트
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
				{likedBooks &&
					(likedBooks as BookData[]).map((item: BookData, index: number) => (
						<Box
							key={index}
							sx={{
								padding: '5px',
								display: 'flex',
								justifyContent: 'space-between',
								cursor: 'pointer',
								color: 'text.primary',
								fontWeight: 'bold',
							}}
							onClick={() => onMoveBookDetail(item.isbn)}
						>
							<Box sx={{ display: 'flex', gap: '10px' }}>
								<Typography fontWeight='bold' sx={{ color: 'red' }}>
									{index + 1}위
								</Typography>
								<Typography>{item.title}</Typography>
							</Box>
							<Typography sx={{ color: 'red' }}>
								[{item.commentTotalNumber}]
							</Typography>
						</Box>
					))}
			</Box>
		</Box>
	);
};
