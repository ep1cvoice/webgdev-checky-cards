import { memo } from 'react';
import QuestionCard from '../QuestionCard';
import type { Card } from '../../hooks/cardsApi';
import styles from './QuestionCardList.module.css';

interface QuestionCardListProps {
	cards: Card[];
}

const QuestionCardList = memo(({ cards }: QuestionCardListProps) => {
	return (
		<div className={styles.cardList}>
			{cards.map((card, index) => (
				<QuestionCard card={card} key={index} />
			))}
		</div>
	);
});

export default QuestionCardList;
