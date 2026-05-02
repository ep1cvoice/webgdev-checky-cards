import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import styles from './RegisterPage.module.css';

const PASSWORD_MIN_LENGTH = 8;

type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

const RegisterPage = () => {
	const { signUp } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const validate = (): string | null => {
		const trimmedEmail = email.trim();
		if (!trimmedEmail || !password || !confirmPassword) {
			return 'Please fill in all fields.';
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			return 'Please enter a valid email address.';
		}
		if (password.length < PASSWORD_MIN_LENGTH) {
			return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
		}
		if (password !== confirmPassword) {
			return 'Passwords do not match.';
		}
		return null;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setError('');
		setSuccessMsg('');

		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		setLoading(true);
		try {
			await signUp(email.trim(), password);
			setSuccessMsg('Account created! Check your email to confirm your address, then sign in.');
		} catch (err) {
			setError((err as Error).message || 'Registration failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const passwordStrength = (): PasswordStrength => {
		if (!password) return null;
		if (password.length < PASSWORD_MIN_LENGTH) return 'weak';
		if (password.length >= PASSWORD_MIN_LENGTH && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
		return 'medium';
	};

	const strength = passwordStrength();

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<UserPlus size={28} className={styles.icon} />
					<h1 className={styles.title}>Create Account</h1>
					<p className={styles.subtitle}>Join WebDev Cards today</p>
				</div>

				{successMsg ? (
					<div className={styles.successBox}>
						<p>{successMsg}</p>
						<button className={styles.submitBtn} onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
							Go to Sign In
						</button>
					</div>
				) : (
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
									placeholder='Min. 8 characters'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete='new-password'
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
							{strength && (
								<div className={styles.strengthRow}>
									<div className={`${styles.strengthBar} ${styles[strength]}`} />
									<span className={`${styles.strengthLabel} ${styles[strength]}`}>
										{strength === 'weak' && 'Weak'}
										{strength === 'medium' && 'Medium'}
										{strength === 'strong' && 'Strong'}
									</span>
								</div>
							)}
						</div>

						<div className={styles.field}>
							<label htmlFor='confirmPassword' className={styles.label}>
								Confirm Password
							</label>
							<div className={styles.passwordWrapper}>
								<input
									id='confirmPassword'
									type={showConfirm ? 'text' : 'password'}
									className={`${styles.input} ${
										confirmPassword && confirmPassword !== password ? styles.inputError : ''
									}`}
									placeholder='Repeat your password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									autoComplete='new-password'
									disabled={loading}
								/>
								<button
									type='button'
									className={styles.eyeBtn}
									onClick={() => setShowConfirm((v) => !v)}
									tabIndex={-1}
									aria-label={showConfirm ? 'Hide password' : 'Show password'}
								>
									{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						{error && <p className={styles.error}>{error}</p>}

						<button type='submit' className={styles.submitBtn} disabled={loading}>
							{loading ? 'Creating account...' : 'Create Account'}
						</button>
					</form>
				)}

				<p className={styles.footer}>
					Already have an account?{' '}
					<Link to='/login' className={styles.link}>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
