import { PaletteMode } from '@mui/material';
import { green, grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: grey[800],
						light: grey[700],
						dark: grey[900],
					},
					background: {
						default: '#f3f5f9',
						search: '#fff',
						searchFocus: '#fff',
						nav: '#e9ebf1',
						book: '#f3f1f2',
						hover: '#d6d4d4',
						mark: '#111',
						btn: grey[500],
						btnhover: grey[600],
						paper: grey[800],
						content: '#fff',
					},
					text: {
						primary: '#000',
						secondary: grey[600],
						success: green[600],
						hover: grey[600],
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: grey[700],
						light: grey[600],
						dark: grey[800],
					},
					background: {
						default: grey[800],
						search: grey[900],
						searchFocus: grey[800],
						nav: '#111',
						book: grey[700],
						hover: grey[900],
						mark: '#fff',
						btn: grey[600],
						btnhover: grey[700],
						paper: grey[900],
						content: grey[700],
					},
					text: {
						primary: '#fff',
						secondary: grey[400],
						success: '#fff',
						hover: grey[500],
					},
			  }),
	},
	typography: {
		fontFamily: ['SUIT-Regular'].join(','),
	},
});

export default getDesignTokens;
