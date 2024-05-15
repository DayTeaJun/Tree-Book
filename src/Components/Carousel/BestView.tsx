import { Box, Paper, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import Carousel from 'react-material-ui-carousel';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { getBestcomments } from '../../Api/Firebase/getBestBook';
import BookItem from '../Books/BookItem';

const BestView = () => {
	const { isDownSM, isDownMD } = useMediaQueries();
	const itemsPerPage = isDownSM ? 2 : isDownMD ? 4 : 5;

	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks'],
		queryFn: () => getBestcomments('likedBook', 'views', 20),
	});

	const chunkArray = (arr: BookData[], chunkSize: number) => {
		const chunkedArray = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			chunkedArray.push(arr.slice(i, i + chunkSize));
		}
		return chunkedArray;
	};

	const chunkedLikedBooks =
		likedBooks && chunkArray(likedBooks as any, itemsPerPage);

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
				duration={1000}
				height={`${isDownSM ? '280px' : '300px'}`}
				autoPlay={false}
				sx={{
					width: '100%',
					margin: '0 auto',
				}}
				navButtonsAlwaysVisible={true}
			>
				{chunkedLikedBooks &&
					chunkedLikedBooks.map((_, index: number) => (
						<Paper
							key={index}
							sx={{
								width: '100%',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '20px',
								boxShadow: 'none',
								borderRadius: '0',
								background: 'inherit',
								cursor: 'pointer',
								paddingTop: '20px',
							}}
						>
							{chunkedLikedBooks &&
								(chunkedLikedBooks[index] as BookData[]).map(
									(item: BookData, index: number) => (
										<BookItem
											item={item}
											page={item.page}
											id={item.id}
											search={item.search}
											key={item.url}
											like={item.isbn}
										/>
									)
								)}
						</Paper>
					))}
			</Carousel>
		</>
	);
};

export default BestView;
