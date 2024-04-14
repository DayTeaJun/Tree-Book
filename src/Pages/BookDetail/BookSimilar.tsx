import { Box, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../Api/searchApi';
import BookItem from '../../Components/Books/BookItem';

export const BookSimilar = ({ item }: { item: BookData }) => {
	const publisher = item.publisher;

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookSimilar'],
		queryFn: () => publisher && getBooks(publisher, 5, '1', 'publisher'),
	});

	return (
		<>
			<Typography component='h2' fontSize='1.2em'>
				같은 출판사의 최신 책
			</Typography>
			<Box
				component='section'
				sx={{
					display: 'flex',
					width: '100%',
					padding: '20px 0',
					gap: '20px',
					flexWrap: 'wrap',
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
