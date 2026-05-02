import { useEffect, useState, createContext, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem('theme') as Theme) || 'system'
	);

	const getSystemTheme = (): Theme =>
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

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within ThemeProvider');
	return context;
};
