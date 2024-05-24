import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import { useContext, useMemo } from 'react';
import getDesignTokens from '../themes/palette';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const MuiProvider = ({ children }: Props) => {
	const { mode } = useSelector((state: RootState) => state.darkMode);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
				autoHideDuration={3000}
				style={{
					background: theme.palette.background.paper,
					color: '#fff',
				}}
				action={(snackbarKey) => (
					<SnackbarCloseButton snackbarKey={snackbarKey} />
				)}
			>
				{children}
			</SnackbarProvider>
		</ThemeProvider>
	);
};

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
	const { closeSnackbar } = useSnackbar();

	return (
		<IconButton size='small' onClick={() => closeSnackbar(snackbarKey)}>
			<CloseIcon sx={{ color: '#fff' }} />
		</IconButton>
	);
};
