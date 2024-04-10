import { Box, Paper, Typography } from '@mui/material';
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
								border: '1px solid #ccc',
								cursor: 'pointer',
								color: 'text.primary',
								fontWeight: 'bold',
							}}
							onClick={() => onMoveBookDetail(item.isbn)}
						>
							<Typography>{item.title}</Typography>
							<Typography>{index + 1} 위</Typography>
						</Box>
					))}
			</Box>
		</Box>
	);
};
