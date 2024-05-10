import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Label } from '../../Styles/Common';
import { Box, IconButton, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = () => {
	const [search, setSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (!inputRef.current) return;
		setSearch(inputRef.current.value);
	};

	useEffect(() => {
		if (search !== '') {
			navigate(`/search/${search}/1`);
			setSearch('');
		}
	}, [search]);

	return (
		<Box
			component='form'
			sx={{
				display: 'flex',
				padding: '0.5em 0 1em 0',
			}}
			onSubmit={handleSubmit}
		>
			<Label htmlFor='searchTtitle'>도서 검색창</Label>

			<Input
				id='searchTtitle'
				type='text'
				inputRef={inputRef}
				placeholder='책 이름을 입력해주세요.'
				fullWidth={true}
				inputProps={{
					style: {
						textAlign: 'center',
						color: 'text.primary',
						fontWeight: 'bold',
					},
				}}
			/>
			<IconButton type='submit' aria-label='searchButton'>
				<SearchIcon />
			</IconButton>
		</Box>
	);
};
