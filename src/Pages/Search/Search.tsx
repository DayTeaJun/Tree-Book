import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { useParams } from 'react-router-dom';
import BookItem from '../../Components/Books/BookItem';
import { Paginaition } from '../../Components/Pagination/Pagination';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { Box } from '@mui/material';

export default function Search() {
	const { searchView, page } = useParams<{
		searchView: string;
		page: string;
	}>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchView, page],
		queryFn: () => getBooks(searchView || '', 16, page),
		enabled: !!searchView,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return (
			<Box
				component='section'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
					padding: '20px 0',
					gap: '20px',
					flexWrap: 'wrap',
				}}
			>
				{Array.from({ length: 16 }).map((_, index) => (
					<BookItemSkeleton key={index} />
				))}
			</Box>
		);
	}

	return (
		<>
			<Box
				component='section'
				sx={{
					display: 'flex',
					width: '100%',
					padding: '20px 0',
					gap: '20px',
					flexWrap: 'wrap',
				}}
			>
				{books &&
					books.documents.map((item: BookData, index: number) => (
						<BookItem
							item={item}
							page={page}
							id={index}
							search={searchView || ''}
							key={index}
						></BookItem>
					))}
				{!isLoading && books.documents.length === 0 && (
					<p>검색 결과가 없습니다.</p>
				)}
			</Box>
			{!isLoading && books.documents.length > 0 && (
				<Paginaition
					page={page}
					searchView={searchView}
					totalPage={Math.ceil(books.meta.pageable_count / 14)}
				/>
			)}
		</>
	);
}
