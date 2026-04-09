import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useRevealAnswer } from '../../context/RevealAnswerContext';
import Button from '../../components/Button';
import Switch from 'react-switch';

import { ArrowLeft, Settings } from 'lucide-react';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
	const { revealMode, setRevealMode } = useRevealAnswer();

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
					</div>

					<div className={styles.modeSelector}>
						<button className={revealMode === 'hover' ? styles.active : ''} onClick={() => setRevealMode('hover')}>
							Hover
						</button>

						<button className={revealMode === 'click' ? styles.active : ''} onClick={() => setRevealMode('click')}>
							Click
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsPage;
