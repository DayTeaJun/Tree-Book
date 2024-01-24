import { Box, Pagination } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Paginaition = ({ currentPage, setCurrentPage }: Props) => {
	const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pagination page={currentPage} onChange={onPageChange} count={10} />
		</Box>
	);
};
