import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import DevOpsLogo from '../../assets/Devops_logo.jpg';
import ExpressLogo from '../../assets/Express_logo.png';

import { Plus, LogIn, Settings, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

type MenuType = 'mobile' | 'desktop';

type TechnologyKey = 'html' | 'css' | 'javascript' | 'react' | 'typescript' | 'git' | 'web' | 'node' | 'next' | 'devops' | 'backend' | 'other';

const TECHNOLOGIES: Record<TechnologyKey, { icon: string; label: string }> = {
	html: { icon: htmlLogo, label: 'HTML' },
	css: { icon: cssLogo, label: 'CSS' },
	javascript: { icon: JSLogo, label: 'JavaScript' },
	react: { icon: ReactLogo, label: 'React' },
	typescript: { icon: TSLogo, label: 'TypeScript' },
	git: { icon: GitHubLogo, label: 'Git' },
	web: { icon: InternetLogo, label: 'Web Basics' },
	node: { icon: NodeLogo, label: 'Node.js' },
	next: { icon: NextLogo, label: 'Next.js' },
	devops: { icon: DevOpsLogo, label: 'DevOps' },
	backend: { icon: ExpressLogo, label: 'Backend' },
	other: { icon: OtherLogo, label: 'Other' },
};

const Header = () => {
	const navigate = useNavigate();
	const { isAuth, signOut } = useAuth();
	const [menuType, setMenuType] = useState<MenuType>('mobile');
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);

	const toggleMenu = (type: MenuType = 'mobile') => {
		if (isOpen && menuType === type) {
			setIsOpen(false);
			return;
		}
		setMenuType(type);
		setIsOpen(true);
	};

	const [searchParams] = useSearchParams();
	const activeTechnology = searchParams.get('technology');
	const currentTech = activeTechnology ? (TECHNOLOGIES[activeTechnology as TechnologyKey] ?? null) : null;

	const goToTechnology = (tech: TechnologyKey) => {
		navigate(`/?technology=${tech}`);
		setIsOpen(false);
	};

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
		const handleClickOutside = (event: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<header className={styles.header}>
				{!(isOpen && menuType === 'mobile') && (
					<div className={`${styles.burger} ${styles.mobileBurger}`} onClick={() => toggleMenu('mobile')}>
						<Menu size={28} />
					</div>
				)}

				<div className={styles.headerDesktopLeft}>
					{!(isOpen && menuType === 'desktop') && (
						<div className={`${styles.burger} ${styles.desktopBurger}`} onClick={() => toggleMenu('desktop')}>
							<Menu size={28} />
						</div>
					)}

					{currentTech && (
						<div className={`${styles.headerLabel} ${styles.active}`}>
							<img className={styles.headerIcon} src={currentTech.icon} alt={currentTech.label} />
							<span className={styles.labelText}>{currentTech.label}</span>
						</div>
					)}
				</div>

				<div className={styles.rightSide}>
					<div className={styles.brand} onClick={() => navigate('/')}>
						<span className={`${styles.brandContent} ${currentTech ? styles.brandHiddenMobile : ''}`}>
							<TagLogo className={`${styles.headerIcon} ${styles.tagIcon}`} />
							<span className={styles.brandText}>WebDev Cards</span>
						</span>
						{currentTech && (
							<span className={styles.mobileCategoryLabel}>
								<img className={styles.headerIcon} src={currentTech.icon} alt={currentTech.label} />
								<span className={styles.labelText}>{currentTech.label}</span>
							</span>
						)}
					</div>

					<div className={styles.headerButtons}>
						{isAuth ? (
							<>
								<Button onClick={() => navigate('/addquestion')} isNeutral={true}>
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
							<LogIn size={18} />
							{isAuth ? 'Log Out' : 'Log In'}
						</Button>
					</div>
				</div>
			</header>

			{isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

			<div ref={navRef} className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
				{menuType === 'mobile' && (
					<div className={styles.sideMenuTop}>
						<div className={styles.sideMenuBrand} onClick={() => { navigate('/'); setIsOpen(false); }}>
							<TagLogo className={`${styles.headerIcon} ${styles.tagIcon}`} />
							<span className={styles.brandText}>WebDev Cards</span>
						</div>
						<div className={styles.sideMenuClose} onClick={() => setIsOpen(false)}>
							<X size={28} />
						</div>
					</div>
				)}

				{isAuth && menuType === 'mobile' ? (
					<>
						<Button
							onClick={() => {
								setIsOpen(false);
								navigate('/addquestion');
							}}
							isNeutral={true}>
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
				{menuType === 'mobile' ? (
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

				{(Object.entries(TECHNOLOGIES) as [TechnologyKey, { icon: string; label: string }][]).map(([key, { icon, label }]) => (
					<div
						key={key}
						className={`${styles.menuItem} ${activeTechnology === key ? styles.activeMenuItem : ''}`}
						onClick={() => goToTechnology(key)}>
						<img src={icon} alt={label} />
						<span>{label}</span>
					</div>
				))}
			</div>
		</>
	);
};

export default Header;
