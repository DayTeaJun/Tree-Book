import { useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';

export default function SearchMain() {
	const [searchTitle, setSearchTitle] = useState('');

	const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTitle(e.target.value);
	};

	const {
		data: books,
		isLoading,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ['books', searchTitle],
		queryFn: () => getBooks(searchTitle),
		enabled: false,
		refetchOnWindowFocus: false,
	});

	const handleGetBooks = async (e: React.FormEvent) => {
		e.preventDefault();
		refetch();
		console.log(books);
		console.log(isLoading);
	};

	return (
		<>
			<form onSubmit={handleGetBooks}>
				<label htmlFor='searchTtitle'></label>
				<input
					id='searchTtitle'
					type='text'
					onChange={handleInputTitle}
					value={searchTitle}
				/>
				<button>클릭</button>
			</form>

			{books ? (
				isFetching ? (
					<h2>not found</h2>
				) : (
					books.map((el: BData) => <h2 key={el.isbn}>{el.authors}</h2>)
				)
			) : null}
		</>
	);
}
