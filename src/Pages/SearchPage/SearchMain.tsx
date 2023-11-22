import { FormEventHandler, useRef, useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';

export default function SearchMain() {
	const [searchTitle, setSearchTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log('hello');
		if (!inputRef.current) return;

		setSearchTitle(inputRef.current.value);
	};

	const {
		data: books,
		isLoading,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ['books', searchTitle],
		queryFn: () => getBooks(searchTitle),
		enabled: !!searchTitle,
		refetchOnWindowFocus: false,
	});

	// const handleGetBooks = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	refetch();
	// 	console.log(books);
	// 	console.log(isLoading);
	// };

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor='searchTtitle'></label>
				<input id='searchTtitle' type='text' ref={inputRef} />
				<button>클릭</button>
			</form>

			{books ? (
				isFetching ? (
					<h2>not found</h2>
				) : (
					books.map((el: BData) => (
						<div key={el.isbn}>
							<img src={el.thumbnail} alt={`책 ${el.title}의 이미지`} />
							<h2>{el.authors}</h2>
							<h2>출판사 : {el.publisher}</h2>
							<p>{el.price}원</p>
						</div>
					))
				)
			) : null}
		</>
	);
}
