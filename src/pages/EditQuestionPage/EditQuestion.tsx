import { useActionState, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import Button from '../../components/Button';
import { dateFormat } from '../../helpers/dateFormat';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import type { Card } from '../../hooks/cardsApi';
import { Info, X, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

import styles from './EditQuestionPage.module.css';

type EditFormState = (Card & { clearForm: boolean }) | { clearForm: boolean };

const updateCardFetch = async (id: number, data: Partial<Card>): Promise<Card> => {
	const { data: { user } } = await supabase.auth.getUser();
	const { data: updated, error } = await supabase
		.from('user_cards')
		.update(data)
		.eq('id', id)
		.eq('user_id', user!.id)
		.select()
		.single();

	if (error) throw new Error(error.message);
	return updated as Card;
};

const editCardAction = async (_prevState: EditFormState, formData: FormData): Promise<EditFormState> => {
	try {
		const newQuestion = Object.fromEntries(formData) as Record<string, string>;
		const resources = newQuestion.resources.trim();
		const isClearForm = newQuestion.clearForm === 'on';
		const questionId = Number(newQuestion.id);

		const question = await updateCardFetch(questionId, {
			question: newQuestion.question.trim(),
			category: newQuestion.category.trim(),
			level: Number(newQuestion.level),
			priority: Number(newQuestion.priority),
			answer: newQuestion.answer.trim(),
			description: newQuestion.description.trim(),
			resources: newQuestion.resources.length ? resources.split(',').map((r) => r.trim()) : [],
			editDate: dateFormat(new Date()),
		});

		return isClearForm ? { clearForm: true } : { ...question, clearForm: false };
	} catch (err) {
		console.log((err as Error).message);
		return { clearForm: false };
	}
};

interface EditQuestionProps {
	initialState: Card;
}

const EditQuestion = ({ initialState }: EditQuestionProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { user } = useAuth();
	const [submitted, setSubmitted] = useState(false);

	const [formState, formAction] = useActionState<EditFormState, FormData>(editCardAction, {
		...initialState,
		clearForm: false,
	});

	useEffect(() => {
		if (submitted && (formState as Card & { clearForm: boolean })?.id) {
			navigate(`/question/${(formState as Card).id}`);
		}
	}, [submitted, formState, navigate]);

	const handleSubmit = (formData: FormData): void => {
		setSubmitted(true);
		formAction(formData);
	};

	const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
		const check = confirm('Are your sure you want to delete this card?');

		if (!check) {
			return;
		}

		const { error } = await supabase
			.from('user_cards')
			.delete()
			.eq('id', initialState.id)
			.eq('user_id', user!.id);

		if (error) throw new Error(error.message);
		navigate('/');
	});

	return (
		<>
			<div className={styles.formContainer}>
				<div className={styles.topContainer}>
					<div className={styles.topContainerLeft}>
						<Button onClick={() => navigate(-1)}>
							{' '}
							<ArrowLeft size={18} /> Go Back{' '}
						</Button>
						<h1 className={styles.formTitle}>Edit</h1>
					</div>
					<div className={styles.topContainerRight}>
						<button className={styles.infoBtn} onClick={() => setIsModalOpen(true)}>
							<Info />
						</button>

						<button className={styles.deleteBtn} onClick={removeQuestion} disabled={isQuestionRemoving}>
							<X />
						</button>
					</div>
				</div>
				<QuestionForm formAction={handleSubmit} formState={formState} submitBtnText='Edit Card' />
			</div>

			{isModalOpen && (
				<div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
					<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
						<button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
							<X size={18} />
						</button>

						<h2 className={styles.modalTitle}>Markdown styling info</h2>

						<div className={`${styles.example} ${styles.section}`}>
							<div className={styles.exampleBlock}>
								<p className={styles.infoTitle}>Bold text:</p>
								<pre>{`This is **bold text**`}</pre>
							</div>

							<div className={styles.exampleBlock}>
								<p className={styles.resultLabel}>Result</p>
								<p className={styles.modalLi}>
									This is <strong>bold text</strong>
								</p>
							</div>
						</div>

						<div className={`${styles.example} ${styles.section}`}>
							<div className={styles.exampleBlock}>
								<p className={styles.infoTitle}>Inline code:</p>
								<pre>{`Use \`const x = 10;\``}</pre>
							</div>

							<div className={styles.exampleBlock}>
								<p className={styles.resultLabel}>Result</p>
								<MarkdownRenderer content={`Use \`const x = 10;\``} />
							</div>
						</div>
						<div className={`${styles.example} ${styles.section}`}>
							<div className={styles.exampleBlock}>
								<p className={styles.infoTitle}>Code block:</p>
								<pre>{`\`\`\`js
console.log('Hello, World!');
\`\`\``}</pre>
							</div>

							<div>
								<p className={styles.resultLabel}>Result</p>
								<MarkdownRenderer
									content={`\`\`\`js
console.log('Hello, World!');
\`\`\``}
								/>
							</div>
						</div>

						<div className={`${styles.example} ${styles.section}`}>
							<div className={styles.exampleBlock}>
								<p className={styles.infoTitle}>List:</p>
								<pre>{`- item 1
- item 2`}</pre>
							</div>

							<div className={styles.exampleBlock}>
								<p className={styles.resultLabel}>Result</p>
								<ul>
									<li className={styles.modalLi}>item 1</li>
									<li className={styles.modalLi}>item 2</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EditQuestion;
