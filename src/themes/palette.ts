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
					},
					text: {
						primary: '#000',
						secondary: grey[600],
						success: green[600],
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
						book: grey[900],
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
