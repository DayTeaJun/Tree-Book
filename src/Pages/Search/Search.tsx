import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopNavbar } from '../../Layouts/topNavbar.styled';

export default function Search() {
	const [searchTitle, setSearchTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (!inputRef.current) return;
		setSearchTitle(inputRef.current.value);
	};

	useEffect(() => {
		if (searchTitle !== '') {
			navigate(`/search/${searchTitle}`);
			setSearchTitle('');
		}
	}, [searchTitle]);

	return (
		<>
			<TopNavbar $formTag={true} $linkTag={true}>
				<Link to='/' />
				<form onSubmit={handleSubmit}>
					<label htmlFor='searchTtitle'>도서 검색창</label>
					<input
						id='searchTtitle'
						type='text'
						ref={inputRef}
						spellCheck='false'
					/>
					<button>검색</button>
				</form>
			</TopNavbar>
		</>
	);
}
