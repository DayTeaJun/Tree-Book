import { FormEventHandler, useRef, useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';
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
						style={{
							marginRight: '10px',
							padding: '10px',
							borderBottom: 'solid 1px black',
						}}
						type='text'
						ref={inputRef}
					/>
					<button
						style={{
							border: '0',
							borderRadius: '5px',
							background: 'skyblue',
							padding: '10px',
							color: '#fff',
						}}
					>
						검색
					</button>
				</form>
			</TopNavbar>

			{books && books.length !== 0 ? (
				<section
					style={{
						width: '100%',
						padding: '20px',
						display: 'flex',
						justifyContent: 'center',
						gap: '5px',
						flexWrap: 'wrap',
					}}
				>
					{books.map((el: BData) => (
						<Link
							to={`./${el.title}`}
							state={{ bookData: el }}
							key={el.isbn}
							style={{ padding: '10px', width: '150px' }}
						>
							<img
								style={{ borderRadius: '5px' }}
								src={el.thumbnail}
								alt={`책 ${el.title}의 이미지`}
							/>
							<h2
								style={{
									textAlign: 'center',
									fontSize: '14px',
									fontWeight: 'bold',
									marginTop: '5px',
								}}
							>
								{el.title}
							</h2>
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
