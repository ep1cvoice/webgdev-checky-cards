import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useId, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import type { Card } from '../../hooks/cardsApi';

import Button from '../../components/Button';
import Badge from '../../components/Badge';
import type { BadgeProps } from '../../components/Badge/Badge';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { Loader } from '../../components/Loader';

type BadgeVariant = BadgeProps['option'];

import htmlLogo from '../../assets/HTML5.png';
import cssLogo from '../../assets/CSS3.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import TSLogo from '../../assets/typescript_logo.png';
import GitHubLogo from '../../assets/github_logo.png';
import InternetLogo from '../../assets/internet_logo.png';
import NodeLogo from '../../assets/nodejs-icon.svg';
import DevOpsLogo from '../../assets/Devops_logo.jpg';
import ExpressLogo from '../../assets/Express_logo.png';
import OtherLogo from '../../assets/menu.png';

import { Pencil, ArrowLeft } from 'lucide-react';
import styles from './QuestionPage.module.css';

const categoryIcons: Record<string, string> = {
	html: htmlLogo,
	css: cssLogo,
	react: ReactLogo,
	javascript: JSLogo,
	typescript: TSLogo,
	node: NodeLogo,
	git: GitHubLogo,
	web: InternetLogo,
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

const QuestionPage = () => {
	const navigate = useNavigate();
	const { isAuth, hasUserCards } = useAuth();
	const location = useLocation();

	const checkboxId = useId();
	const { id } = useParams<{ id: string }>();
	const [card, setCard] = useState<Card | null>(null);

	const table = isAuth && hasUserCards ? 'user_cards' : 'cards';

	const [fetchCard, isCardLoading] = useFetch(async () => {
		const { data, error } = await supabase
			.from(table)
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw new Error(error.message);
		setCard(data as Card);
		return data as Card;
	});

	const [updateCard, isCardUpdating] = useFetch(async (checked: boolean) => {
		const { data, error } = await supabase
			.from('user_cards')
			.update({ completed: checked })
			.eq('id', card!.id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		setCard(data as Card);
		return data as Card;
	});

	useEffect(() => {
		fetchCard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isCardLoading || !card) {
		return <Loader />;
	}

	const isChecked = card.completed ?? false;

	const onCheckBoxChangeHandler = (): void => {
		updateCard(!isChecked);
	};

	const levelOption: BadgeVariant = levelMap[Number(card.level)] ?? 'primary';
	const completedOption: BadgeVariant = card.completed ? 'success' : 'primary';

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cardLabels}>
					<div className={styles.leftSide}>
						<Badge option={levelOption}>
							<div>Level: {card.level}</div>
						</Badge>
						<Badge option={completedOption}>
							<div>{card.completed ? 'Completed' : 'Not Completed'}</div>
						</Badge>

						{card.editDate && <p className={styles.editDateInfo}>last edited: {card.editDate}</p>}
					</div>

					<img src={categoryIcons[card.category]} alt={card.category} />
				</div>

				<h5 className={styles.cardTitle}>{card.question}</h5>
				<MarkdownRenderer content={card.description} />

				<div className={styles.cardAnswers}>
					<span>Short Answer:</span>
					<p className={styles.cardParagraph}>{card.answer}</p>
				</div>

				<ul className={styles.cardLinks}>
					Links:
					{card.resources?.map((link, index) => (
						<li key={index}>
							<a href={link.trim()} target='_blank' rel='noreferrer'>
								{link.trim()}
							</a>
						</li>
					))}
				</ul>

				{isAuth && hasUserCards && (
					<label htmlFor={checkboxId} className={styles.checkboxWrapper}>
						<input
							type='checkbox'
							id={checkboxId}
							className={styles.checkbox}
							checked={isChecked}
							onChange={onCheckBoxChangeHandler}
							disabled={isCardUpdating}
						/>
						<span>mark question as completed</span>
					</label>
				)}

				<div className={styles.buttonsContainer}>
					<Button onClick={() => navigate(`/${location.search}`)} isDisabled={isCardUpdating}>
						<ArrowLeft size={18} /> Go Back
					</Button>
					{isAuth && hasUserCards && (
						<Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
							<Pencil size={18} /> Edit Card
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default QuestionPage;
