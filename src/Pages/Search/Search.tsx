import { FormEventHandler, useRef, useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';
import { TopNavbar } from '../../Layouts/topNavbar.styled';
import { SearchSection } from './search.style';

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
			<TopNavbar formTag={true}>
				<form onSubmit={handleSubmit}>
					<label htmlFor='searchTtitle'>도서 검색창</label>
					<input id='searchTtitle' type='text' ref={inputRef} />
					<button>검색</button>
				</form>
			</TopNavbar>

			{books && books.length !== 0 ? (
				<SearchSection>
					{books.map((el: BData) => (
						<Link to={`./${el.title}`} state={{ bookData: el }} key={el.isbn}>
							<img
								style={{ borderRadius: '5px' }}
								src={el.thumbnail}
								alt={`책 ${el.title}의 이미지`}
							/>
							<h2>{el.title}</h2>
						</Link>
					))}
				</SearchSection>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
