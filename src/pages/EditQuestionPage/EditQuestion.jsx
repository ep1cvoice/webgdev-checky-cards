import { useActionState, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import Button from '../../components/Button';
import { dateFormat } from '../../helpers/dateFormat';
import { useFetch } from '../../hooks/useFetch';
import { Info, X, ArrowLeft } from 'lucide-react';
import { API_URL } from '../../constants';

import styles from './EditQuestionPage.module.css';

const updateCardFetch = async (id, data) => {
	const response = await fetch(`${API_URL}/checkycards/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return await response.json();
};

const editCardAction = async (_prevState, formData) => {
	try {
		const newQuestion = Object.fromEntries(formData);
		const resources = newQuestion.resources.trim();
		const isClearForm = newQuestion.clearForm === 'on';
		const questionId = newQuestion.id;

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
		console.log(err.message);
		return { clearForm: false };
	}
};

const EditQuestion = ({ initialState = {} }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);

	const [formState, formAction] = useActionState(editCardAction, {
		...initialState,
		clearForm: false,
	});

	useEffect(() => {
		if (submitted && formState?.id) {
			navigate(`/question/${formState.id}`);
		}
	}, [submitted, formState, navigate]);

	const handleSubmit = (e) => {
		setSubmitted(true);
		formAction(e);
	};

	const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
		let check = confirm('Are your sure you want to delete this card?');

		if (!check) {
			return;
		}

		await fetch(`${API_URL}/checkycards/${initialState.id}`, {
			method: 'DELETE',
		});

		navigate('/');
	});

	return (
		<>
			<div className={styles.formContainer}>
				<div className={styles.topContainer}>
					<div className={styles.topContainerLeft}>
						<Button onClick={() => navigate((-1))}>
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
