import { useContext } from 'react';
import { AuthContext } from '../auth/authProvider/AuthContext';

export const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;