import styles from './SettingsPage.module.css';

const SettingsPage = () => {
	return (
		<>
			<h1 className={styles.formTitle}>Settings</h1>

			<div className={styles.formContainer}>
				<div className={`${styles.section}`}>
					<div className={styles.sectionBlock}>
						<p className={styles.infoTitle}>Dark/Light mode</p>
					</div>
				</div>
				<div className={`${styles.section}`}>
					<div className={styles.sectionBlock}>
						<p className={styles.infoTitle}>Hover/Click to reveal answer</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsPage;
