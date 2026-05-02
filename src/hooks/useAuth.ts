import { useContext } from 'react';
import { AuthContext } from '../auth/authProvider/AuthContext';
import type { AuthContextType } from '../auth/authProvider/AuthContext';

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};

export default useAuth;
