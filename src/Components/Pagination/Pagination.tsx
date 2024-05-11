import { Box, Pagination } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaginaitionType } from '../../Types/componentType';
import { useMediaQueries } from '../../Hook/useMediaQueries';

export const CustomPaginaition = ({
	searchView,
	page,
	handlePageChange,
	totalPage,
	count,
	menuRef,
}: PaginaitionType) => {
	const { isDownMD } = useMediaQueries();
	const navigate = useNavigate();
	const pageNumber: number = parseInt(page as string, 10);
	const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
		if (searchView) {
			navigate(`/search/${searchView}/${page}`);
		} else if (handlePageChange) {
			handlePageChange(page);
		}
		if (menuRef && menuRef.current) {
			menuRef.current.scrollIntoView({ behavior: 'smooth' });
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
				size={`${isDownMD ? 'small' : 'large'}`}
			/>
		</Box>
	);
};
