import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

const DarkModeContext = createContext({
	darkMode: false,
	toggleDarkMode: () => {},
});

const updateDarkMode = (darkMode: boolean) => {
	if (darkMode) {
		localStorage.theme = 'dark';
		document.documentElement.classList.add('dark');
	} else {
		localStorage.theme = 'light';
		document.documentElement.classList.remove('dark');
	}
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const DarkModeProvider = ({ children }: Props) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		updateDarkMode(!darkMode);
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		const isDark =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches); // 사용자 기종 다크모드 확인
		setDarkMode(isDark);
		updateDarkMode(isDark);
	}, []);

	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => useContext(DarkModeContext);
