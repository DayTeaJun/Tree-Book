import { useState } from 'react';
import { KakaoSearch } from '../../Api/kakaoApi';

export default function SearchMain() {
	const [books, setBooks] = useState([]);

	const getBooks = async () => {
		try {
			const params = {
				query: '도라에몽',
				size: 45,
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
			<button onClick={getBooks}>클릭</button>
		</>
	);
}
