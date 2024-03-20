import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#009B00',
			dark: '#2b2d31',
			light: '#f5f6f7',
		},
		secondary: {
			main: '#EEFD53',
		},
		success: {
			main: '#4AD395',
		},
		error: {
			main: '#DA1E28',
		},
	},
	typography: {
		fontFamily: ['SUIT-Regular'].join(','),
	},
});

export default theme;
