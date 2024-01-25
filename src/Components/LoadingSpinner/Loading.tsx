import { Backdrop, Box, CircularProgress } from '@mui/material';

interface LoadingType {
	BackDrop?: boolean;
}

export const Loading = ({ BackDrop }: LoadingType) => {
	if (BackDrop) {
		return (
			<Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<CircularProgress />
			</Backdrop>
		);
	} else {
		return (
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 9999,
					padding: '10px',
				}}
			>
				<CircularProgress color='success' />
			</Box>
		);
	}
};
