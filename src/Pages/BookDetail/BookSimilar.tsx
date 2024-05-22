import { Box, Grid, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import BookItem from '../../Components/Books/BookItem';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { useSnackbar } from 'notistack';

export const BookSimilar = ({ item }: { item: BookData }) => {
	const { isDownMD, isDownSM } = useMediaQueries();
	const { enqueueSnackbar } = useSnackbar();
	const publisher = item.publisher;

	const {
		data: books,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['bookSimilar', publisher],
		queryFn: () => publisher && getBooks(publisher, 10, '1', 'publisher'),
	});

	if (error) {
		enqueueSnackbar('프로필 변경에 실패하였습니다.', { variant: 'error' });
	}

	return (
		<>
			<Typography
				component='h2'
				fontWeight='bold'
				fontSize='1.2em'
				sx={{
					borderBottom: '1px solid',
					paddingBottom: '10px',
					color: 'text.secondary',
				}}
			>
				같은 출판사의 최신 책
			</Typography>
			<Box
				component='section'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexFlow: 'wrap',
					width: '100%',
					padding: '30px 0',
				}}
			>
				{books &&
					books.documents.length !== 0 &&
					books.documents.map((book: BookData, index: number) => (
						<Box
							sx={{
								width: `${
									(isDownSM && 'calc((100%) / 2)') ||
									(isDownMD && 'calc((100%) / 4)') ||
									'calc((100%) / 5)'
								}`,
								paddingBottom: '10px',
							}}
							key={index}
							component='ul'
						>
							<BookItem
								item={book}
								page={'1'}
								id={index}
								publisher={publisher}
							/>
						</Box>
					))}
			</Box>
		</>
	);
};
