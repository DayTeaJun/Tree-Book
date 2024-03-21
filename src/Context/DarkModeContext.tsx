import { ThemeProvider, createTheme } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import getDesignTokens from '../themes/palette';

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

export const DarkModeProvider = ({ children }: Props) => {
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
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => useContext(DarkModeContext);
