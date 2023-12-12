import styled, { css } from 'styled-components';
import { getBooks } from '../Api/searchApi';
import { FormEventHandler, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
interface TopNavbarProps {
	$formTag?: boolean;
}

export const TopNavbar = styled('header')<TopNavbarProps>`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 5px;

	${({ $formTag }) =>
		$formTag &&
		css`
			form {
				display: flex;
				label {
					clip: rect(1px, 1px, 1px, 1px);
					clip-path: inset(50%);
					width: 1px;
					height: 1px;
					margin: -1px;
					overflow: hidden;
					position: absolute;
				}
				input {
					font-size: 18px;
					margin-right: 10px;
					padding: 0 5px 0 5px;
					border: none;
					border-bottom: solid 1px black;
					&:focus {
						outline: none;
					}
				}
				button {
					border: 0;
					border-radius: 5px;
					background: skyblue;
					padding: 10px;
					color: #fff;
					cursor: pointer;
				}
			}
		`}
`;

export const SearchForm = () => {
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
			<TopNavbar $formTag={true}>
				<form onSubmit={handleSubmit}>
					<label htmlFor='searchTtitle'>도서 검색창</label>
					<input id='searchTtitle' type='text' ref={inputRef} />
					<button>검색</button>
				</form>
			</TopNavbar>
		</>
	);
};
