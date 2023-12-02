import { FormEventHandler, useRef, useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { TopNavbar } from '../../Layouts/topNavbar.styled';

export default function Search() {
	const [searchTitle, setSearchTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
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
			<TopNavbar>
				<form style={{ display: 'flex' }} onSubmit={handleSubmit}>
					<label htmlFor='searchTtitle'></label>
					<input
						id='searchTtitle'
						style={{ marginRight: '10px' }}
						type='text'
						ref={inputRef}
					/>
					<Button style={{ height: '100%' }} variant='contained'>
						검색
					</Button>
				</form>
			</TopNavbar>

			{books && books.length !== 0 ? (
				<section style={{ display: 'flex', gap: '10px' }}>
					{books.map((el: BData) => (
						<Link to={`./${el.title}`} state={{ bookData: el }} key={el.isbn}>
							<img src={el.thumbnail} alt={`책 ${el.title}의 이미지`} />
							<h2>{el.authors}</h2>
							<h2>출판사 : {el.publisher}</h2>
							<p>{el.price}원</p>
						</Link>
					))}
				</section>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
