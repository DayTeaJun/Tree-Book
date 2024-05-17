import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import errorImg from '../../Assets/No-img.svg';
import { CustomPaginaition } from '../../Components/Pagination/Pagination';
import { SearchSkeleton } from './Search.skeleton';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { SearchInput } from './SearchInput';

export default function Search() {
	const { searchView, page } = useParams<{
		searchView: string;
		page: string;
	}>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchView, page],
		queryFn: () => getBooks(searchView || '', 10, page),
		enabled: !!searchView,
		refetchOnWindowFocus: false,
	});

	const navigate = useNavigate();
	const { isDownMD } = useMediaQueries();

	const onMoveBookDetail = (id: number, isbn: string) => {
		navigate(`/search/${searchView}/${page}/${id}`, { state: { isbn } });
	};

	return (
		<>
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
				{isLoading &&
					Array.from({ length: 10 }).map((_, index) => (
						<SearchSkeleton key={index} />
					))}
				{!isLoading &&
					books.documents &&
					(books.documents as BookData[]).map(
						(item: BookData, index: number) => (
							<Box
								component='li'
								key={index}
								sx={{
									width: `${isDownMD ? '100%' : 'calc((100% - 20px) / 2)'}`,
									height: '120px',
									display: 'flex',
									color: 'text.primary',
									fontWeight: 'bold',
									paddingRight: '20px',
									marginBottom: '10px',
								}}
							>
								<Box
									sx={{
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										gap: '20px',
										cursor: 'pointer',
									}}
									onClick={() => onMoveBookDetail(index, item.isbn)}
								>
									<Box
										sx={{
											width: '80px',
											borderRadius: '5px',
											overflow: 'hidden',
											flexShrink: 0,
										}}
									>
										{item.thumbnail ? (
											<img
												src={item.thumbnail}
												alt={`책 ${item.title}의 이미지`}
											/>
										) : (
											<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
										)}
									</Box>
									<Box
										sx={{
											width: 'calc(90% - 140px)',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-around',
											gap: '3px',
										}}
									>
										<Typography
											fontSize='1.1em'
											fontWeight={'bold'}
											sx={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												'&:hover': {
													textDecoration: 'underline',
													textDecorationColor: '#ccc',
													textUnderlinePosition: 'under',
												},
											}}
										>
											{item.title}
										</Typography>
										<Typography
											component='p'
											fontSize={'0.9em'}
											fontWeight={'bold'}
											sx={{
												color: 'text.secondary',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
											}}
										>
											{item.authors.length > 1
												? item.authors.join(' | ')
												: item.authors}
										</Typography>
										<Divider sx={{ margin: '5px 0' }} />
									</Box>
								</Box>
							</Box>
						)
					)}

				{searchView !== ' ' && !isLoading && books.documents.length === 0 && (
					<p>검색 결과가 없습니다.</p>
				)}
			</Box>
			{page && !isLoading && books.documents.length > 0 && (
				<CustomPaginaition
					page={page}
					searchView={searchView}
					totalPage={Math.ceil(books.meta.pageable_count / 10)}
				/>
			)}
		</>
	);
}
