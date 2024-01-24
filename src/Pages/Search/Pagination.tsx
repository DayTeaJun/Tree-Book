import { Box, Pagination } from '@mui/material';

export const Paginaition = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pagination count={10} />
		</Box>
	);
};
