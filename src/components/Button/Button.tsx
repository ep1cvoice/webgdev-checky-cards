import styles from './Button.module.css';
import type { FC, ReactNode } from 'react';

export interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
	isActive?: boolean;
	isDisabled?: boolean;
	isNeutral?: boolean;
	isLogged?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, children, isActive, isDisabled, isNeutral, isLogged }) => {
	return (
		<button
			className={`${styles.button} ${isActive ? styles.active : ''} ${isNeutral ? styles.neutral : ''} ${isLogged ? styles.logged : ''}`}
			onClick={onClick}
			disabled={isDisabled}>
			{children}
		</button>
	);
};

export default Button;
