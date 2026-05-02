import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useRevealAnswer } from '../../context/RevealAnswerContext';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Switch from 'react-switch';

import { ArrowLeft, Settings } from 'lucide-react';
import styles from './SettingsPage.module.css';

type DangerMode = 'account' | null;

const SettingsPage = () => {
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
	const { revealMode, setRevealMode } = useRevealAnswer();
	const { user, deleteAccount } = useAuth();

	const [dangerMode, setDangerMode] = useState<DangerMode>(null);
	const [emailInput, setEmailInput] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);
	const [dangerError, setDangerError] = useState('');

	const openModal = (mode: DangerMode): void => {
		setDangerMode(mode);
		setEmailInput('');
		setDangerError('');
	};

	const closeModal = (): void => {
		setDangerMode(null);
		setEmailInput('');
		setDangerError('');
	};

	const handleConfirm = async (): Promise<void> => {
		if (!user) return;

		if (emailInput.trim().toLowerCase() !== user.email?.toLowerCase()) {
			setDangerError('Email does not match.');
			return;
		}

		setIsProcessing(true);
		setDangerError('');

		try {
			await deleteAccount();
			navigate('/');
		} catch {
			setDangerError('Something went wrong. Please try again.');
			setIsProcessing(false);
		}
	};

	const modalLabel = 'Delete account';
	const modalDesc = 'Your account and all data will be permanently deleted. This cannot be undone.';

	return (
		<>
			<div className={styles.formContainer}>
				<div className={styles.topContainer}>
					<Button onClick={() => navigate(-1)}>
						<ArrowLeft size={18} /> Go Back
					</Button>
					<div className={styles.containerRight}>
						<h2 className={styles.formTitle}>Settings</h2>
						<Settings size={30} />
					</div>
				</div>

				{user && (
					<div className={styles.section}>
						<p className={styles.infoTitle}>Profile</p>
						<p className={styles.subText}>Signed in as</p>
						<p className={styles.emailDisplay}>{user.email}</p>
					</div>
				)}

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
						<button className={theme === 'light' ? styles.active : ''} onClick={() => setTheme('light')}>Light</button>
						<button className={theme === 'dark' ? styles.active : ''} onClick={() => setTheme('dark')}>Dark</button>
						<button className={theme === 'system' ? styles.active : ''} onClick={() => setTheme('system')}>Auto</button>
					</div>
				</div>

				<div className={styles.section}>
					<div className={styles.row}>
						<p className={styles.infoTitle}>Hover / Click to reveal answer</p>
					</div>
					<div className={styles.modeSelector}>
						<button className={revealMode === 'hover' ? styles.active : ''} onClick={() => setRevealMode('hover')}>Hover</button>
						<button className={revealMode === 'click' ? styles.active : ''} onClick={() => setRevealMode('click')}>Click</button>
					</div>
				</div>

				<div className={styles.dangerSection}>
					<p className={styles.dangerTitle}>Danger Zone</p>

					<div className={styles.dangerBox}>
						<div>
							<p className={styles.infoTitle}>Delete account</p>
							<p className={styles.subText}>Permanently deletes your account and all data.</p>
						</div>
						<button className={styles.dangerButton} onClick={() => openModal('account')} >
							Delete account
						</button>
					</div>
				</div>
			</div>

			{dangerMode && (
				<div className={styles.modalOverlay} onClick={closeModal}>
					<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
						<h3 className={styles.modalTitle}>{modalLabel}?</h3>
						<p className={styles.subText}>
							{modalDesc}
							<br /><br />
							Type your email <strong>{user?.email}</strong> to confirm.
						</p>
						<input
							type='email'
							className={styles.modalInput}
							placeholder={user?.email ?? ''}
							value={emailInput}
							onChange={(e) => setEmailInput(e.target.value)}
							autoFocus
						/>
						{dangerError && <p style={{ color: '#ff4d4f', fontSize: 13, marginTop: 8 }}>{dangerError}</p>}
						<div className={styles.modalActions}>
							<button onClick={closeModal} disabled={isProcessing}>Cancel</button>
							<button
								className={styles.dangerButton}
								onClick={handleConfirm}
								disabled={isProcessing || !emailInput}>
								{isProcessing ? 'Processing…' : modalLabel}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SettingsPage;
