import { getBooks } from '../../Api/searchApi';
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomPaginaition } from '../../Components/Pagination/Pagination';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { SearchInput } from './SearchInput';
import SearchItem from './SearchItem';
import { useEffect } from 'react';

export default function Search() {
	const navigate = useNavigate();
	const { isDownMD } = useMediaQueries();
	const queryClient = useQueryClient();

	const { searchView, page } = useParams<{
		searchView: string;
		page: string;
	}>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchView, page],
		queryFn: () => getBooks(searchView || '', 10, page),
		enabled: !!searchView,
		refetchOnWindowFocus: false,
		staleTime: 60000,
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (books && books.meta && books.meta.pageable_count && page) {
			const totalPages = Math.ceil(books.meta.pageable_count / 10);
			if (Number(page) < totalPages) {
				const nextPage = Number(page) + 1;
				queryClient.prefetchQuery({
					queryKey: ['books', searchView, nextPage],
					queryFn: () => getBooks(searchView || '', 10, String(nextPage)),
				});
			}
		}
	}, [page, queryClient, searchView, books]);

	const onMoveBookDetail = (id: number, isbn: string) => {
		navigate(`/search/${searchView}/${page}/${id}`, { state: { isbn } });
	};

	return (
		<Box component='main'>
			<Helmet>
				<title>{`${
					searchView !== ' '
						? searchView + ' - TreeBook'
						: '검색 페이지 - TreeBook'
				}`}</title>
			</Helmet>
			{isDownMD && <SearchInput />}
			{searchView !== ' ' && (
				<>
					<Typography component='h1' fontSize='1.5em' fontWeight='bold'>
						{`"${searchView}" 의 검색 결과`}
					</Typography>
					<Divider sx={{ margin: '5px 0' }} />
				</>
			)}
			<Box
				component='ul'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexFlow: 'wrap',
					width: '100%',
					padding: '20px 0',
				}}
			>
				{!isLoading &&
					books.documents &&
					(books.documents as BookData[]).map(
						(item: BookData, index: number) => (
							<SearchItem
								onMoveBookDetail={onMoveBookDetail}
								item={item}
								index={index}
								key={index}
							/>
						)
					)}

				{searchView !== ' ' && !isLoading && books.documents.length === 0 && (
					<Typography component='h2' fontSize='1.2em' fontWeight='bold'>
						검색 결과가 없습니다.
					</Typography>
				)}
			</Box>
			{page && !isLoading && books.documents.length > 0 && (
				<CustomPaginaition
					page={page}
					searchView={searchView}
					totalPage={Math.ceil(books.meta.pageable_count / 10)}
				/>
			)}
		</Box>
	);
}
