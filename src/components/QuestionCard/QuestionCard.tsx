import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useRevealAnswer } from '../../context/RevealAnswerContext';
import Button from '../Button';
import Badge from '../Badge';
import type { BadgeProps } from '../Badge/Badge';
import type { Card } from '../../hooks/cardsApi';

import cssLogo from '../../assets/CSS3.png';
import htmlLogo from '../../assets/HTML5.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import TSLogo from '../../assets/typescript_logo.png';
import GitHubLogo from '../../assets/github_logo.png';
import InternetLogo from '../../assets/internet_logo.png';
import NextLogo from '../../assets/nextjs-icon.svg';
import NodeLogo from '../../assets/nodejs-icon.svg';
import OtherLogo from '../../assets/menu.png';
import DevOpsLogo from '../../assets/Devops_logo.jpg';
import ExpressLogo from '../../assets/Express_logo.png';

import { Star, Expand, Check } from 'lucide-react';
import styles from './QuestionCard.module.css';

type BadgeVariant = BadgeProps['option'];

const categoryIcons: Record<string, string> = {
	html: htmlLogo,
	css: cssLogo,
	javascript: JSLogo,
	react: ReactLogo,
	typescript: TSLogo,
	git: GitHubLogo,
	web: InternetLogo,
	node: NodeLogo,
	next: NextLogo,
	devops: DevOpsLogo,
	backend: ExpressLogo,
	other: OtherLogo,
};

const levelMap: Record<number, BadgeVariant> = {
	1: 'primary',
	2: 'warning',
	3: 'alert',
	4: 'danger',
};

interface QuestionCardProps {
	card: Card;
}

const QuestionCard = ({ card }: QuestionCardProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const levelOption = levelMap[Number(card.level)] ?? 'primary';
	const completedOption: BadgeVariant = card.completed ? 'success' : 'primary';
	const priority = Math.min(Math.max(card.priority ?? 0, 0), 4);

	const { revealMode } = useRevealAnswer();
	const isHoverSupported = window.matchMedia('(hover: hover)').matches;
	const effectiveMode = isHoverSupported ? revealMode : 'click';

	const [showAnswer, setShowAnswer] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	return (
		<div className={styles.card}>
			<div className={styles.cardLabels}>
				<div className={styles.leftSide}>
					<Badge option={levelOption}>
						<div>Level: {card.level}</div>
					</Badge>
					<Badge option={completedOption}>
						<div className={styles.completionBadge}>
							{card.completed ? (
								<>
									<Check size={20} />
									Completed
								</>
							) : (
								'Not Completed'
							)}
						</div>
					</Badge>
				</div>

				<img src={categoryIcons[card.category?.trim()] ?? JSLogo} alt={card.category} />
			</div>

			<h5 className={styles.cardTitle}>{card.question}</h5>

			<div className={styles.cardAnswers}>
				<span>Short Answer:</span>
				<p
					className={`${styles.cardParagraph} ${showAnswer ? styles.show : ''} ${effectiveMode === 'click' ? styles.clickable : ''}`}
					onClick={(e) => {
						e.stopPropagation();

						if (effectiveMode === 'click') {
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
						if (effectiveMode === 'hover') setShowAnswer(true);
					}}
					onMouseLeave={() => {
						if (effectiveMode === 'hover') setShowAnswer(false);
					}}>
					{card.answer}
				</p>
			</div>

			<div className={styles.cardFooter}>
				<div className={styles.priority} data-priority={priority}>
					<span className={styles.priorityText}>Priority: {priority}</span>
					<Star className={styles.priorityIcon} />
				</div>

				<Button onClick={() => navigate(`/question/${card.id}${location.search}`)}>
					{' '}
					View <Expand size={18} />
				</Button>
			</div>
		</div>
	);
};

export default QuestionCard;
