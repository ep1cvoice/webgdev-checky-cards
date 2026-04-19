import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import Button from '../Button';

import htmlLogo from '../../assets/HTML5.png';
import cssLogo from '../../assets/CSS3.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import TSLogo from '../../assets/typescript_logo.png';
import GitHubLogo from '../../assets/github_logo.png';
import InternetLogo from '../../assets/internet_logo.png';
import TagLogo from '../../assets/html-tag.svg?react';
import NodeLogo from '../../assets/nodejs-icon.svg';
import NextLogo from '../../assets/nextjs-icon.svg';
import OtherLogo from '../../assets/menu.png';

import { Plus, LogIn, Settings, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
	const navigate = useNavigate();
	const { isAuth, signOut } = useAuth();
	const [menuType, setMenuType] = useState('mobile');
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef(null);

	const toggleMenu = (type = 'mobile') => {
		if (isOpen && menuType === type) {
			setIsOpen(false);
			return;
		}
		setMenuType(type);
		setIsOpen(true);
	};

	const TECHNOLOGIES = {
		html: { icon: htmlLogo, label: 'HTML' },
		css: { icon: cssLogo, label: 'CSS' },
		javascript: { icon: JSLogo, label: 'JavaScript' },
		react: { icon: ReactLogo, label: 'React' },
		typescript: { icon: TSLogo, label: 'TypeScript' },
		git: { icon: GitHubLogo, label: 'Git' },
		web: { icon: InternetLogo, label: 'Web Basics' },
		node: { icon: NodeLogo, label: 'Node.js' },
		next: { icon: NextLogo, label: 'Next.js' },
		other: { icon: OtherLogo, label: 'Other' },
	};

	const goToTechnology = (tech) => {
		navigate(`/?technology=${tech}`);
		setIsOpen(false);
	};

	const [searchParams] = useSearchParams();
	const activeTechnology = searchParams.get('technology');
	const currentTech = TECHNOLOGIES[activeTechnology] || null;

	const loginHandler = async () => {
		if (isAuth) {
			try {
				await signOut();
				navigate('/');
			} catch {
				// ignore
			}
		} else {
			navigate('/login');
		}
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setIsOpen(false); 
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, setIsOpen]);

	return (
		<>
			<header className={styles.header}>
				{!(isOpen && menuType === 'mobile') && (
					<div className={`${styles.burger} ${styles.mobileBurger}`} onClick={() => toggleMenu('mobile')}>
						<Menu size={28} />
					</div>
				)}

				<div className={styles.headerDesktopLeft}>
					<div className={`${styles.burger} ${styles.desktopBurger}`} onClick={() => toggleMenu('desktop')}>
						{isOpen && menuType === 'desktop' ? <X size={28} /> : <Menu size={28} />}
					</div>

					{currentTech && (
						<div className={`${styles.headerLabel} ${styles.active}`}>
							<img className={styles.headerIcon} src={currentTech.icon} alt={currentTech.label} />
							<span className={styles.labelText}>{currentTech.label}</span>
						</div>
					)}
				</div>

				<div className={styles.rightSide}>
					<div className={styles.brand} onClick={() => navigate('/')}>
						<TagLogo className={`${styles.headerIcon} ${styles.tagIcon}`} />
						<span className={styles.brandText}>WebDev Cards</span>
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
						<Button onClick={loginHandler} isLogged={isAuth} isNeutral={!isAuth}>
							<LogIn size={18} i />
							{isAuth ? 'Log Out' : 'Log In'}
						</Button>
					</div>
				</div>
			</header>

			{isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

			<div ref={navRef} className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
				{menuType === 'mobile' && (
					<div className={styles.sideMenuClose} onClick={() => setIsOpen(false)}>
						<X size={28} />
					</div>
				)}

				{isAuth && menuType === 'mobile' ? (
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
				{menuType == 'mobile' ? (
					<Button
						onClick={() => {
							setIsOpen(false);
							loginHandler();
						}}
						isLogged={isAuth}
						isNeutral={!isAuth}>
						<LogIn size={16} />
						{isAuth ? 'Log Out' : 'Log In'}
					</Button>
				) : (
					''
				)}

				<h3>Technologies</h3>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'html' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('html')}>
					<img src={htmlLogo} alt='html' />
					<span>HTML</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'css' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('css')}>
					<img src={cssLogo} alt='css' />
					<span>CSS</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'javascript' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('javascript')}>
					<img src={JSLogo} alt='JS' />
					<span>JavaScript</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'react' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('react')}>
					<img src={ReactLogo} alt='React' />
					<span>React</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'typescript' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('typescript')}>
					<img src={TSLogo} alt='Typescript' />
					<span>TypeScript</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'node' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('node')}>
					<img src={NodeLogo} alt='Node.jsx' />
					<span>Node.js</span>
				</div>
				<div
					className={`${styles.menuItem} ${activeTechnology === 'next' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('next')}>
					<img src={NextLogo} alt='Next.jsx' />
					<span>Next.js</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'web' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('web')}>
					<img src={InternetLogo} alt='Web Fundamentals' />
					<span>Web Basics</span>
				</div>
				<div
					className={`${styles.menuItem} ${activeTechnology === 'git' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('git')}>
					<img src={GitHubLogo} alt='Gi' />
					<span>Git</span>
				</div>

				<div
					className={`${styles.menuItem} ${activeTechnology === 'other' ? styles.activeMenuItem : ''}`}
					onClick={() => goToTechnology('other')}>
					<img src={OtherLogo} alt='Other topics' />
					<span>Other</span>
				</div>
			</div>
		</>
	);
};

export default Header;
