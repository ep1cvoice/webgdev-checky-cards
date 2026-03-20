import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
	const [showModal, setShowModal] = useState(false);
	const [confirmText, setConfirmText] = useState('');

	const handleDeleteAll = async () => {
		try {
			const res = await fetch('http://localhost:8800/checkycards');
			const cards = await res.json();

			await Promise.all(
				cards.map((card) =>
					fetch(`http://localhost:8800/checkycards/${card.id}`, {
						method: 'DELETE',
					}),
				),
			);

			setShowModal(false);
			setConfirmText('');

		} catch (err) {
			console.error(err);
		}
	};

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
				<div className={styles.dangerSection}>
					<p className={styles.dangerTitle}>Danger Zone</p>
					<div className={styles.dangerBox}>
						<div>
							<p className={styles.infoTitle}>Delete all cards</p>
							<p className={styles.subText}>This action cannot be undone.</p>
						</div>

						<button className={styles.dangerButton} onClick={() => setShowModal(true)}>
							Delete All
						</button>
					</div>
				</div>
			</div>

			{showModal && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>

						<h3 className={styles.modalTitle}>Confirm deletion</h3>
						<p>
							Type <b>Yes, delete all cards</b> to confirm.
						</p>

						<input
							type='text'
							value={confirmText}
							onChange={(e) => setConfirmText(e.target.value)}
							className={styles.modalInput}
							/>

						<div className={styles.modalActions}>
							<button onClick={() => setShowModal(false)}>Cancel</button>

							<button
								className={styles.dangerButton}
								disabled={confirmText !== 'Yes, delete all cards'}
								onClick={handleDeleteAll}>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SettingsPage;
