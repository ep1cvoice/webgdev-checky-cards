import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useRevealAnswer } from '../../context/RevealAnswerContext';
import Button from '../Button';
import Badge from '../Badge';

import cssLogo from '../../assets/CSS3.png';
import htmlLogo from '../../assets/HTML5.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import TSLogo from '../../assets/typescript_logo.png';
import GitHubLogo from '../../assets/github_logo.png';
import InternetLogo from '../../assets/internet_logo.png';

import { Expand } from 'lucide-react';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ card }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const categoryIcons = {
		html: htmlLogo,
		css: cssLogo,
		javascript: JSLogo,
		react: ReactLogo,
		typescript: TSLogo,
		git: GitHubLogo,
		web: InternetLogo,
	};

	const levelMap = {
		1: 'primary',
		2: 'warning',
		3: 'alert',
		4: 'danger',
	};

	const levelOption = levelMap[Number(card.level)] || 'primary';

	const completedOption = card.completed ? 'success' : 'primary';

	const { revealMode } = useRevealAnswer();
	const [showAnswer, setShowAnswer] = useState(false);
	const timeoutRef = useRef(null);

	return (
		<div className={styles.card}>
			<div className={styles.cardLabels}>
				<div className={styles.leftSide}>
					<Badge option={levelOption}>
						<div>Level: {card.level}</div>
					</Badge>
					<Badge option={completedOption}>
						<div>{card.completed ? 'Completed' : 'Not Completed'}</div>
					</Badge>
				</div>

				<img src={categoryIcons[card.category?.trim()] || JSLogo} alt={card.category} />
			</div>

			<h5 className={styles.cardTitle}>{card.question}</h5>

			<div className={styles.cardAnswers}>
				<span>Short Answer:</span>
				<p
					className={`${styles.cardParagraph} ${showAnswer ? styles.show : ''} ${revealMode === 'click' ? styles.clickable : ''}`}
					onClick={(e) => {
						e.stopPropagation();

						if (revealMode === 'click') {
							setShowAnswer(true);

							if (timeoutRef.current) {
								clearTimeout(timeoutRef.current);
							}

							timeoutRef.current = setTimeout(() => {
								setShowAnswer(false);
							}, 4000);
						}
					}}
					onMouseEnter={() => {
						if (revealMode === 'hover') setShowAnswer(true);
					}}
					onMouseLeave={() => {
						if (revealMode === 'hover') setShowAnswer(false);
					}}>
					{card.answer}
				</p>
			</div>

			<Button onClick={() => navigate(`/question/${card.id}${location.search}`)}>
				{' '}
				View <Expand size={18} />
			</Button>
		</div>
	);
};

export default QuestionCard;
