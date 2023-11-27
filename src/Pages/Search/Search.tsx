import { FormEventHandler, useRef, useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';

export default function Search() {
	const [searchTitle, setSearchTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log('hello');
		if (!inputRef.current) return;

		setSearchTitle(inputRef.current.value);
	};

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchTitle],
		queryFn: () => getBooks(searchTitle),
		enabled: !!searchTitle,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor='searchTtitle'></label>
				<input id='searchTtitle' type='text' ref={inputRef} />
				<button>클릭</button>
			</form>

			{books && books.length !== 0 ? (
				<>
					{books.map((el: BData) => (
						<Link to={'./detail'} state={{ bookData: el }} key={el.isbn}>
							<img src={el.thumbnail} alt={`책 ${el.title}의 이미지`} />
							<h2>{el.authors}</h2>
							<h2>출판사 : {el.publisher}</h2>
							<p>{el.price}원</p>
						</Link>
					))}
				</>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
