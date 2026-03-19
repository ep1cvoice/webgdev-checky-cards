import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { ArrowLeft } from 'lucide-react';
import styles from './ForbiddenPage.module.css';

const ForbiddenPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { isAuth } = useAuth();

	const fromPage = location.state?.from?.pathname || '/';

	useEffect(() => {
		if (isAuth) {
			navigate(fromPage, { replace: true });
		}
	}, [isAuth, navigate, fromPage]);

	return (
		<div className={styles.forbiddenWrapper}>
			<div className={styles.forbiddenCard}>
				<h1 className={styles.code}>403</h1>

				<h2 className={styles.title}>Access Forbidden</h2>

				<p className={styles.description}>
					Please log in to access this page.
				</p>

				<Link to='/' className={styles.button}>
					<ArrowLeft />
					Go Back Home
				</Link>
			</div>
		</div>
	);
};

export default ForbiddenPage;