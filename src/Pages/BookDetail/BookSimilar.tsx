import { Box, Typography } from '@mui/material';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { useBookSimilar } from '../../Hook/QueryHook/getBookQuery';

export const BookSimilar = ({ item }: { item: BookData }) => {
	const { isDownMD, isDownSM } = useMediaQueries();
	const publisher = item.publisher;

	const { data: books } = useBookSimilar(publisher);

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
