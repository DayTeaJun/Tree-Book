import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useMediaQueries = () => {
	const theme = useTheme();
	// sm : 600 - 899px, md : 900 - 1199px, lg : 1200 - 1919px

	const isDownSM = useMediaQuery(theme.breakpoints.down('sm'));
	const isUpSM = useMediaQuery(theme.breakpoints.up('sm'));
	const isDownMD = useMediaQuery(theme.breakpoints.down('md'));
	const isUpMD = useMediaQuery(theme.breakpoints.up('md'));
	const isDownLG = useMediaQuery(theme.breakpoints.down('lg'));
	const isUpLG = useMediaQuery(theme.breakpoints.up('lg'));

	return {
		isUpSM,
		isDownSM,
		isUpMD,
		isDownMD,
		isUpLG,
		isDownLG,
	};
};
