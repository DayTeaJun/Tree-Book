import { Box, Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
	page?: string | number;
	searchView?: string;
	handlePageChange?: (newPage: number) => void;
	count?: number | null;
}

export const Paginaition = ({
	searchView,
	page,
	handlePageChange,
	count,
}: Props) => {
	const navigate = useNavigate();
	const pageNumber: number = parseInt(page as string, 10);
	const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
		if (searchView) {
			navigate(`/search/${searchView}/${page}`);
		} else if (handlePageChange) {
			handlePageChange(page);
		}
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pagination
				page={pageNumber}
				onChange={onPageChange}
				count={count || 100}
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};
