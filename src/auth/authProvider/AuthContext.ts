import { createContext } from 'react';
import type { User } from '@supabase/supabase-js';

export interface AuthContextType {
	isAuth: boolean;
	user: User | null;
	hasUserCards: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	copyCards: () => Promise<void>;
	deleteAllCards: () => Promise<void>;
	deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
