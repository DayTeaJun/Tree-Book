import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import getDesignTokens from '../themes/palette';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';

const DarkModeContext = createContext({
	mode: 'light' || 'dark',
	toggleDarkMode: () => {},
});

const updateDarkMode = (darkMode: boolean) => {
	if (darkMode) {
		localStorage.theme = 'dark';
	} else {
		localStorage.theme = 'light';
	}
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const MuiProvider = ({ children }: Props) => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	const toggleDarkMode = () => {
		updateDarkMode(mode === 'light' ? true : false);
		setMode(mode === 'light' ? 'dark' : 'light');
	};

	useEffect(() => {
		const isDark =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches); // 사용자 기종 다크모드 확인
		setMode(isDark ? 'dark' : 'light');
		updateDarkMode(isDark);
	}, []);

	return (
		<DarkModeContext.Provider value={{ mode, toggleDarkMode }}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
					autoHideDuration={3000}
					action={(snackbarKey) => (
						<SnackbarCloseButton snackbarKey={snackbarKey} />
					)}
				>
					{children}
				</SnackbarProvider>
			</ThemeProvider>
		</DarkModeContext.Provider>
	);
};

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
	const { closeSnackbar } = useSnackbar();

	return (
		<IconButton size='small' onClick={() => closeSnackbar(snackbarKey)}>
			<CloseIcon />
		</IconButton>
	);
};

export const useDarkMode = () => useContext(DarkModeContext);
