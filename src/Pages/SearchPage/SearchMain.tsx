import { useEffect, useState } from 'react';
import { getBooks } from '../../Api/searchApi';

export default function SearchMain() {
	const [books, setBooks] = useState([]);
	const [searchTitle, setSearchTitle] = useState('');

	const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTitle(e.target.value);
	};

	const handleGetBooks = async (e: React.FormEvent) => {
		e.preventDefault();
		const booksData = await getBooks(searchTitle);
		setBooks(booksData);
	};

	useEffect(() => {
		console.log(books);
	}, [books]);

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
