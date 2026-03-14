import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import Badge from '../Badge';

import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import AngularLogo from '../../assets/angular-logo.svg';
import VueLogo from '../../assets/vue-logo.png';
import NodeLogo from '../../assets/nodejs-icon.svg';
import NextLogo from '../../assets/nextjs-icon.svg'

import styles from './QuestionCard.module.css';

const QuestionCard = ({ card }) => {
	const navigate = useNavigate();

	const categoryIcons = {
		react: ReactLogo,
		javascript: JSLogo,
		angular: AngularLogo,
		vue: VueLogo,
		node: NodeLogo,
		next: NextLogo
	};

	const levelMap = {
		1: 'primary',
		2: 'warning',
		3: 'alert',
		4: 'danger',
	};

	const levelOption = levelMap[Number(card.level)] || 'primary';

	const completedOption = card.completed ? 'success' : 'primary';

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

				<img src={categoryIcons[card.category]} alt={`${card.category}`} />
			</div>

			<h5 className={styles.cardTitle}>{card.question}</h5>

			<div className={styles.cardAnswers}>
				<span>Short Answer:</span>
				<p className={styles.cardParagraph}>{card.answer}</p>
			</div>

			<Button onClick={() => navigate(`/question/${card.id}`)}> View </Button>
		</div>
	);
};

export default QuestionCard;
