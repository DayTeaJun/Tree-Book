import { useLocation, useParams } from 'react-router-dom';
import { BookData } from '../../Types/bookType';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BookViews } from './BookViews';
import Loading from '../../Components/LoadingSpinner/Loading';
import { useBookDetail } from '../../Hook/QueryHook/getBookQuery';

export default function BookDetail() {
	const { id, search, page } = useParams<{
		id: string;
		search: string;
		page: string;
	}>();
	const [item, setItem] = useState<BookData>();
	const { pathname } = useLocation();

	const { data: books, isLoading } = useBookDetail(
		page ?? '1',
		search ?? '',
		id ?? '',
		pathname
	);

	useEffect(() => {
		if (books) {
			const item: BookData = books.documents.find(
				(_: BookData, index: number) => index === (id && parseInt(id))
			);
			setItem(item);
		}
	}, [books, id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
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
	);
}
