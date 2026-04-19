import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import styles from './LoginPage.module.css';

const LoginPage = () => {
	const { signIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const trimmedEmail = email.trim();

		if (!trimmedEmail || !password) {
			setError('Please fill in all fields.');
			return;
		}

		setLoading(true);
		try {
			await signIn(trimmedEmail, password);
			navigate(from, { replace: true });
		} catch (err) {
			setError(err.message || 'Login failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<LogIn size={28} className={styles.icon} />
					<h1 className={styles.title}>Sign In</h1>
					<p className={styles.subtitle}>Welcome back to WebDev Cards</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.form} noValidate>
					<div className={styles.field}>
						<label htmlFor='email' className={styles.label}>
							Email
						</label>
						<input
							id='email'
							type='email'
							className={styles.input}
							placeholder='you@example.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete='email'
							autoFocus
							disabled={loading}
						/>
					</div>

					<div className={styles.field}>
						<label htmlFor='password' className={styles.label}>
							Password
						</label>
						<div className={styles.passwordWrapper}>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								className={styles.input}
								placeholder='••••••••'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete='current-password'
								disabled={loading}
							/>
							<button
								type='button'
								className={styles.eyeBtn}
								onClick={() => setShowPassword((v) => !v)}
								tabIndex={-1}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					{error && <p className={styles.error}>{error}</p>}

					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<p className={styles.footer}>
					Don&apos;t have an account?{' '}
					<Link to='/register' className={styles.link}>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
