import { useState } from 'react';
import { KakaoSearch } from '../../Api/kakaoApi';

export default function SearchMain() {
	const [books, setBooks] = useState([]);
	const [searchTitle, setSearchTitle] = useState('');

	const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTitle(e.target.value);
	};

	const getBooks = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const params = {
				query: searchTitle,
				size: 5,
				target: 'title',
			};
			const result = await KakaoSearch(params);

			if (result) {
				setBooks(result.data.documents);
				console.log(result.data.documents);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={getBooks}>
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
