import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useId, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

import Button from '../../components/Button';
import Badge from '../../components/Badge';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { Loader } from '../../components/Loader';

import htmlLogo from '../../assets/HTML5.png';
import cssLogo from '../../assets/CSS3.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import TSLogo from '../../assets/typescript_logo.png';
import GitHubLogo from '../../assets/github_logo.png';
import InternetLogo from '../../assets/internet_logo.png';

import { Pencil, ArrowLeft } from 'lucide-react';
import styles from './QuestionPage.module.css';

const QuestionPage = () => {
	const navigate = useNavigate();
	const { isAuth } = useAuth();
	const location = useLocation();

	const checkboxId = useId();
	const { id } = useParams();
	const [card, setCard] = useState(null);
	const [isChecked, setIsChecked] = useState(false);

	const [fetchCard, isCardLoading] = useFetch(async () => {
		const { data, error } = await supabase
			.from('checkycards')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw new Error(error.message);
		setCard(data);
		return data;
	});

	const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
		const { data, error } = await supabase
			.from('checkycards')
			.update({ completed: isChecked })
			.eq('id', card.id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		setCard(data);
		return data;
	});

	useEffect(() => {
		fetchCard();
	}, []);

	useEffect(() => {
		card !== null && setIsChecked(card.completed);
	}, [card]);

	if (isCardLoading || !card) {
		return <Loader />;
	}

	const onCheckBoxChangeHandler = () => {
		setIsChecked(!isChecked);
		updateCard(!isChecked);
	};

	const categoryIcons = {
		html: htmlLogo,
		css: cssLogo,
		react: ReactLogo,
		javascript: JSLogo,
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

						{card?.editDate && <p className={styles.editDateInfo}>last edited: {card.editDate}</p>}
					</div>

					<img src={categoryIcons[card.category]} alt={`${card.category}`} />
				</div>

				<h5 className={styles.cardTitle}>{card.question}</h5>
				<MarkdownRenderer content={card.description} />

				<div className={styles.cardAnswers}>
					<span>Short Answer:</span>
					<p className={styles.cardParagraph}>{card.answer}</p>
				</div>

				<ul className={styles.cardLinks}>
					Links:
					{card.resources?.map((link, index) => {
						return (
							<li key={index}>
								<a href={link.trim()} target='_blank' rel='noreferrer'>
									{link.trim()}
								</a>
							</li>
						);
					})}
				</ul>

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

				<div className={styles.buttonsContainer}>
					<Button onClick={() => navigate(`/${location.search}`)} isDisabled={isCardUpdating}>
						{' '}
						<ArrowLeft size={18} /> Go Back{' '}
					</Button>
					{isAuth ? (
						<Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
							<Pencil size={18} /> Edit Card{' '}
						</Button>
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
};

export default QuestionPage;
