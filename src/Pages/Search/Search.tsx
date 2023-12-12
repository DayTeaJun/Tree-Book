import { FormEventHandler, useRef, useState } from 'react';
import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';
import { SearchForm, TopNavbar } from '../../Layouts/topNavbar.styled';
import { Books } from '../../Components/Books/books.style';

export default function Search() {
	const [bookData, setBookData] = useState('');
	return (
		<>
			<SearchForm />

			{books && books.length !== 0 ? (
				<Books $search={true}>
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
				</Books>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			{isLoading && <h2>Loading...</h2>}
		</>
	);
}
