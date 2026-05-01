import { createContext, useContext, useEffect, useState } from 'react';

type RevealMode = 'hover' | 'click';

interface RevealAnswerContextType {
	revealMode: RevealMode;
	setRevealMode: (mode: RevealMode) => void;
}

const RevealAnswerContext = createContext<RevealAnswerContextType | null>(null);

export const RevealAnswerProvider = ({ children }: { children: React.ReactNode }) => {
	const [revealMode, setRevealMode] = useState<RevealMode>(
		(localStorage.getItem('revealMode') as RevealMode) || 'hover'
	);

	useEffect(() => {
		localStorage.setItem('revealMode', revealMode);
	}, [revealMode]);

	return (
		<RevealAnswerContext.Provider value={{ revealMode, setRevealMode }}>
			{children}
		</RevealAnswerContext.Provider>
	);
};

export const useRevealAnswer = (): RevealAnswerContextType => {
	const context = useContext(RevealAnswerContext);
	if (!context) throw new Error('useRevealAnswer must be used within RevealAnswerProvider');
	return context;
};
