import { useState, useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { createCard } from '../../hooks/cardsApi';
import Button from '../../components/Button';
import QuestionForm from '../../components/QuestionForm';

import { ArrowLeft, PenLine } from 'lucide-react';
import styles from './AddQuestionPage.module.css';

const AddQuestionPage = () => {
	const [createCardFetch, isLoading, error] = useFetch(createCard);
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();

	const createCardAction = async (_prevState, formData) => {
		try {
			const newQuestion = Object.fromEntries(formData);
			const resources = newQuestion.resources.trim();
			const isClearForm = newQuestion.clearForm;

			const question = await createCardFetch({
				question: newQuestion.question.trim(),
				category: newQuestion.category.trim(),
				level: Number(newQuestion.level),
				priority: Number(newQuestion.priority),
				answer: newQuestion.answer.trim(),
				description: newQuestion.description.trim(),
				resources: newQuestion.resources.length ? resources.split(',').map((r) => r.trim()) : [],
				completed: false,
			});

			setSuccessMessage('Card successfully created!');

			return isClearForm ? { clearForm: true } : question;
		} catch (err) {
			console.log(err.message);
			return { clearForm: false };
		}
	};

	const [formState, formAction] = useActionState(createCardAction, { clearForm: true });

	return (
		<>
			<div className={styles.formContainer}>
				<div className={styles.topContainer}>
					<Button onClick={() => navigate(-1)}>
						{' '}
						<ArrowLeft size={18} /> Go Back{' '}
					</Button>
					<div className={styles.containerRight}>
						<PenLine size={26} />
						<h2 className={styles.formTitle}>Add New Card</h2>
					</div>
				</div>

				<QuestionForm formAction={formAction} formState={formState} submitBtnText='Create card' isLoading={isLoading} />
				{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</div>
		</>
	);
};

export default AddQuestionPage;
