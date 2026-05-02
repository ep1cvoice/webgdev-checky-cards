import TagLogo from '../../assets/html-tag.svg?react';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
	return (
		<div className={styles.splash}>
			<div className={styles.brand}>
				<TagLogo className={styles.logo} />
				<span className={styles.title}>WebDev Cards</span>
			</div>
		</div>
	);
};

export default SplashScreen;
