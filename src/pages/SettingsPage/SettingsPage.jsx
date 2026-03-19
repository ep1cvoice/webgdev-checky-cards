import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Switch from 'react-switch';

import { ArrowLeft, Settings } from 'lucide-react';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
	const navigate = useNavigate();

	const THEME_KEY = 'theme';
	const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

	const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || 'system');
	const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark');

	useEffect(() => {
		const resolved = theme === 'system' ? getSystemTheme() : theme;

		document.documentElement.setAttribute('data-theme', resolved);

		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');

		const listener = () => {
			if (theme === 'system') {
				const resolved = getSystemTheme();
				document.documentElement.setAttribute('data-theme', resolved);
			}
		};

		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [theme]);

	return (
		<>
			<div className={styles.formContainer}>
				<div className={styles.topContainer}>
					<Button onClick={() => navigate(-1)}>
						{' '}
						<ArrowLeft size={18} /> Go Back{' '}
					</Button>
					<div className={styles.containerRight}>
						<h2 className={styles.formTitle}>Settings</h2>
						<Settings size={30} />
					</div>
				</div>

				<div className={styles.section}>
					<div className={styles.row}>
						<div>
							<p className={styles.infoTitle}>Dark mode</p>
							<p className={styles.subText}>Auto = system preference</p>
						</div>

						<Switch
							checked={isDark}
							onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
							disabled={theme === 'system'}
							offColor='#383b3f'
							onColor='#219679'
							uncheckedIcon={false}
							checkedIcon={false}
							height={20}
							width={40}
						/>
					</div>

					<div className={styles.modeSelector}>
						<button className={theme === 'light' ? styles.active : ''} onClick={() => setTheme('light')}>
							Light
						</button>

						<button className={theme === 'dark' ? styles.active : ''} onClick={() => setTheme('dark')}>
							Dark
						</button>

						<button className={theme === 'system' ? styles.active : ''} onClick={() => setTheme('system')}>
							Auto
						</button>
					</div>
				</div>

				<div className={styles.section}>
					<div className={styles.row}>
						<p className={styles.infoTitle}>Hover / Click to reveal answer</p>

						<Switch
							checked={true}
							onChange={() => {}}
							offColor='#383b3f'
							onColor='#219679'
							uncheckedIcon={false}
							checkedIcon={false}
							height={20}
							width={40}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsPage;
