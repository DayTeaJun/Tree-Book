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
						default: '#fff',
						search: '#fff9fa',
						searchFocus: '#fff',
						nav: grey[100],
						book: '#f3f1f2',
						hover: '#d6d4d4',
						mark: '#111',
					},
					text: {
						primary: '#000',
						secondary: grey[600],
						success: green[600],
						hover: grey[700],
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: grey[700],
						light: grey[600],
						dark: grey[800],
						hover: '#000',
					},
					background: {
						default: grey[800],
						search: grey[900],
						searchFocus: grey[800],
						nav: '#111',
						book: grey[700],
						hover: grey[900],
						mark: '#fff',
					},
					text: {
						primary: '#fff',
						secondary: grey[400],
						success: '#fff',
					},
			  }),
	},
	typography: {
		fontFamily: ['SUIT-Regular'].join(','),
	},
});

export default getDesignTokens;
