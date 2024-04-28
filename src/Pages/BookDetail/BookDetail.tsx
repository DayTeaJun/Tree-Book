import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BookData } from '../../Types/bookType';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BookViews } from './BookViews';
import Loading from '../../Components/LoadingSpinner/Loading';

export default function BookDetail() {
	const { id, search, page } = useParams<{
		id: string;
		search: string;
		page: string;
	}>();
	const [item, setItem] = useState<BookData>();
	const { pathname } = useLocation();

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', page, search, id],
		queryFn: () =>
			search &&
			(pathname.indexOf('/like') !== -1
				? getBooks(search, 1, page, 'isbn')
				: pathname.indexOf('/publisher') !== -1
				? getBooks(search, 10, page, 'publisher')
				: getBooks(search, 16, page, 'title')),
		enabled: !!search,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (books) {
			const item: BookData = books.documents.find(
				(_: BookData, index: number) => index === (id && parseInt(id))
			);
			setItem(item);
		}
	}, [books]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Box component='main' sx={{ display: 'flex', flexDirection: 'column' }}>
				{item && !isLoading ? (
					<>
						<Helmet>
							<title>{item.title} - TreeBook</title>
						</Helmet>
						<BookViews item={item} />
					</>
				) : (
					<>{item && <h2>not found</h2>}</>
				)}
			</Box>
		</>
	);
}
