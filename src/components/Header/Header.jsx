import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STORAGE } from '../../constants';

import Button from '../Button';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';

import htmlLogo from '../../assets/HTML5.png';
import cssLogo from '../../assets/CSS3.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import TSLogo from '../../assets/typescript_logo.png';
import GitHubLogo from '../../assets/github_logo.png';
import InternetLogo from '../../assets/internet_logo.png';
import TagLogo from '../../assets/html-tag.svg?react';

import { Plus, LogIn, Settings } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
	const navigate = useNavigate();
	const { isAuth, setIsAuth } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const goToTechnology = (tech) => {
		navigate(`/?technology=${tech}`);
		setIsOpen(false);
	};

	const [searchParams] = useSearchParams();
	const activeTechnology = searchParams.get('technology');

	const loginHandler = () => {
		localStorage.setItem(AUTH_STORAGE, !isAuth);
		setIsAuth(!isAuth);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.burger} onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<div className={styles.techIcons}>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'html' ? styles.active : ''}`}
						onClick={() => goToTechnology('html')}>
						<img className={styles.headerIcon} src={htmlLogo} alt='html logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'css' ? styles.active : ''}`}
						onClick={() => goToTechnology('css')}>
						<img className={styles.headerIcon} src={cssLogo} alt='css logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'javascript' ? styles.active : ''}`}
						onClick={() => goToTechnology('javascript')}>
						<img className={styles.headerIcon} src={JSLogo} alt='JS logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'react' ? styles.active : ''}`}
						onClick={() => goToTechnology('react')}>
						<img className={styles.headerIcon} src={ReactLogo} alt='React logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'typescript' ? styles.active : ''}`}
						onClick={() => goToTechnology('typescript')}>
						<img className={styles.headerIcon} src={TSLogo} alt='TS logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'git' ? styles.active : ''}`}
						onClick={() => goToTechnology('git')}>
						<img className={styles.headerIcon} src={GitHubLogo} alt='GitHub logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'web' ? styles.active : ''}`}
						onClick={() => goToTechnology('web')}>
						<img className={styles.headerIcon} src={InternetLogo} alt='Internet logo' />
					</button>
				</div>

				<div className={styles.rightSide}>
					<div className={styles.brand} onClick={() => navigate('/')}>
						<TagLogo className={`${styles.headerIcon} ${styles.tagIcon}`} />
						<span>WebDev Cards</span>
					</div>

					<div className={styles.headerButtons}>
						{isAuth ? (
							<>
								<Button onClick={() => navigate('/addquestion')} isDisabled={false} isNeutral={true}>
									<Plus size={18} /> Add New Card{' '}
								</Button>

								<Button onClick={() => navigate('/settings')}>
									<Settings size={18} />
									Settings
								</Button>
							</>
						) : (
							''
						)}
						<Button onClick={loginHandler} isActive={!isAuth}>
							<LogIn size={18} i />
							{isAuth ? 'Log Out' : 'Log In'}
						</Button>
					</div>
				</div>
			</header>

			{isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

			<div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
				<h3>Technologies</h3>

				<div className={styles.menuItem} onClick={() => goToTechnology('html')}>
					<img src={htmlLogo} alt='html' />
					<span>HTML</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('css')}>
					<img src={cssLogo} alt='css' />
					<span>CSS</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('javascript')}>
					<img src={JSLogo} alt='JS' />
					<span>JavaScript</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('react')}>
					<img src={ReactLogo} alt='React' />
					<span>React</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('typescript')}>
					<img src={TSLogo} alt='Typescript' />
					<span>TypeScript</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('git')}>
					<img src={GitHubLogo} alt='GitHub' />
					<span>GitHub</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('web')}>
					<img src={InternetLogo} alt='Web Fundamentals' />
					<span>Web Basics</span>
				</div>

				{isAuth ? (
					<>
						<Button
							onClick={() => {
								setIsOpen(false);
								navigate('/addquestion');
							}}
							isNeutral={true}
							isDisabled={false}>
							<Plus size={16} /> Add New Card{' '}
						</Button>
						<Button
							onClick={() => {
								setIsOpen(false);
								navigate('/settings');
							}}>
							<Settings size={16} /> Settings{' '}
						</Button>
					</>
				) : (
					''
				)}
				<Button
					onClick={() => {
						setIsOpen(false);
						loginHandler();
					}}
					isActive={!isAuth}>
					<LogIn size={16} />
					{isAuth ? 'Log Out' : 'Log In'}
				</Button>
			</div>
		</>
	);
};

export default Header;
