import { createContext, useContext, useEffect, useState } from 'react';

const RevealAnswerContext = createContext();

export const RevealAnswerProvider = ({ children }) => {
	const [revealMode, setRevealMode] = useState(
		localStorage.getItem('revealMode') || 'hover'
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

export const useRevealAnswer = () => {
	const context = useContext(RevealAnswerContext);

	if (!context) {
		throw new Error('useRevealAnswer must be used within RevealAnswerProvider');
	}

	return context;
};