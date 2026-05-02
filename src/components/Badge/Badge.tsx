import type { FC, ReactNode } from 'react';
import styles from './Badge.module.css';

const BADGE_ENUM = {
	PRIMARY: 'primary',
	SUCCESS: 'success',
	WARNING: 'warning',
	ALERT: 'alert',
	DANGER: 'danger',
} as const;

type BadgeVariant = (typeof BADGE_ENUM)[keyof typeof BADGE_ENUM];

export interface BadgeProps {
	children: ReactNode;
	option: BadgeVariant;
}

const Badge: FC<BadgeProps> = ({ option, children }) => {
	switch (option) {
		case 'primary':
			return <div className={`${styles.badge} ${styles.primary}`}>{children}</div>;

		case 'success':
			return <div className={`${styles.badge} ${styles.success}`}>{children}</div>;

		case 'warning':
			return <div className={`${styles.badge} ${styles.warning}`}>{children}</div>;

		case 'alert':
			return <div className={`${styles.badge} ${styles.alert}`}>{children}</div>;
		case 'danger':
			return <div className={`${styles.badge} ${styles.danger}`}>{children}</div>;

		default:
			return <div className={styles.badge}>{children}</div>;
	}
};

export default Badge;
