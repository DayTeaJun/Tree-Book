import { Box, Pagination } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaginaitionType } from '../../Types/componentType';

export const Paginaition = ({
	searchView,
	page,
	handlePageChange,
	totalPage,
	count,
}: PaginaitionType) => {
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
				count={totalPage || count || 100}
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};
