import { Box, Grid, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import BookItem from '../../Components/Books/BookItem';

export const BookSimilar = ({ item }: { item: BookData }) => {
	const publisher = item.publisher;

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookSimilar', publisher],
		queryFn: () => publisher && getBooks(publisher, 10, '1', 'publisher'),
	});

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
					display: 'grid',
					gap: 2,
					gridTemplateColumns: 'repeat(5, 1fr)',
					width: '100%',
					padding: '30px 0',
					marginBottom: '20px',
				}}
			>
				{books &&
					books.documents.length !== 0 &&
					books.documents.map((book: BookData, index: number) => (
						<BookItem
							item={book}
							page={'1'}
							id={index}
							publisher={publisher}
							key={index}
						></BookItem>
					))}
			</Box>
		</>
	);
};
