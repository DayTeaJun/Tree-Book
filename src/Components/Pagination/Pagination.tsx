import { Box, Pagination } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
	page?: string;
	searchView?: string;
}

export const Paginaition = ({ searchView, page }: Props) => {
	const navigate = useNavigate();
	const pageNumber: number = parseInt(page!, 10);
	const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
		navigate(`/search/${searchView}/${page}`);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pagination
				page={pageNumber}
				onChange={onPageChange}
				count={100}
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};
