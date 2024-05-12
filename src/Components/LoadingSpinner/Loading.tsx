import { Backdrop, Box, CircularProgress } from '@mui/material';
import { LoadingType } from '../../Types/componentType';

const Loading = ({ BackDrop }: LoadingType) => {
	if (BackDrop) {
		return (
			<Backdrop open={true} sx={{ zIndex: 9999 }}>
				<CircularProgress />
			</Backdrop>
		);
	} else {
		return (
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					right: '50%',
					transform: 'translate(-50%,-50%)',
					zIndex: 9999,
				}}
			>
				<CircularProgress />
			</Box>
		);
	}
};

export default Loading;
