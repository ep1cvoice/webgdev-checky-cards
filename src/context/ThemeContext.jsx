import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

	const getSystemTheme = () =>
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	useEffect(() => {
		const resolved = theme === 'system' ? getSystemTheme() : theme;

		document.documentElement.setAttribute('data-theme', resolved);
		localStorage.setItem('theme', theme);
	}, [theme]);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');

		const listener = () => {
			if (theme === 'system') {
				document.documentElement.setAttribute(
					'data-theme',
					media.matches ? 'dark' : 'light'
				);
			}
		};

		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);