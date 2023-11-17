import { useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';

export default function SearchMain() {
	const [searchTitle, setSearchTitle] = useState('');

	const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTitle(e.target.value);
	};

	interface BData {
		authors: string[];
		contents: string;
		datetime: string;
		isbn: string;
		price: number;
		publisher: string;
		sale_price: number;
		status: string;
		title: string;
		translators: string[];
		url: string[];
	}

	const {
		data: books,
		isLoading,
		refetch,
	} = useQuery<BData>({
		queryKey: ['books', searchTitle],
		queryFn: () => getBooks(searchTitle),
		enabled: false,
	});

	const handleGetBooks = async (e: React.FormEvent) => {
		e.preventDefault();
		refetch();
	};

	console.log(books);
	console.log(isLoading);

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
		</>
	);
}
