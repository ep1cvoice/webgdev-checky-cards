import Button from '../../components/Button';
import styles from './QuestionForm.module.css';

const QuestionForm = ({ formAction, formState, submitBtnText, isLoading }) => {
	return (
		<form action={formAction} className={styles.form}>
			<input type='hidden' name='id' defaultValue={formState?.id || ''} />
			<div className={styles.formWrapper}>
				<label htmlFor='questionField'>Question: </label>
				<textarea
					defaultValue={formState?.question || ''}
					name='question'
					id='questionField'
					cols='30'
					rows='2'
					required
					placeholder='Enter question title'
					minLength={10}
				/>
			</div>

			<div className={styles.formWrapper}>
				<label htmlFor='categoryField'>Category: </label>
				<select name='category' id='categoryField' defaultValue={formState?.category || ''} required>
					<option disabled value=''>
						Choose Category
					</option>
					<option value='html'>HTML</option>
					<option value='css'>CSS</option>
					<option value='javascript'>Vanilla JS</option>
					<option value='react'>React</option>
					<option value='typescript'>TypeScript</option>
					<option value='git'>Git</option>
					<option value='web'>Web Basics</option>
				</select>
			</div>

			<div className={styles.formWrapper}>
				<label htmlFor='levelField'>Level:</label>
				<select name='level' id='levelField' defaultValue={formState?.level || ''} required>
					<option disabled value=''>
						Question Level
					</option>
					<option value='1'>Easy</option>
					<option value='2'>Medium</option>
					<option value='3'>Advanced</option>
					<option value='4'>Pro</option>
				</select>
			</div>
			<div className={styles.formWrapper}>
				<label htmlFor='priorityField'>Priority:</label>
				<select
					key={formState?.priority}
					name='priority'
					id='priorityField'
					defaultValue={formState?.priority || ''}
					required>
					<option disabled value=''>
						Priority Rank
					</option>
					<option value='0'>Low</option>
					<option value='1'>Medium</option>
					<option value='2'>High</option>
					<option value='3'>Ultra</option>
					<option value='4'>Extreme</option>
				</select>
			</div>

			<div className={styles.formWrapper}>
				<label htmlFor='answerField'>Short Answer: </label>
				<textarea
					defaultValue={formState?.answer || ''}
					name='answer'
					id='answerField'
					cols='30'
					rows='2'
					required
					placeholder='Enter a short answer'
					minLength={5}
				/>
			</div>

			<div className={styles.formWrapper}>
				<label htmlFor='descriptionField'>Full Description: </label>
				<textarea
					defaultValue={formState?.description || ''}
					name='description'
					id='descriptionField'
					cols='30'
					rows='5'
					required
					placeholder='Enter a full description'
					minLength={20}
				/>
			</div>

			<div className={styles.formWrapper}>
				<label htmlFor='resourcesField'>Links: </label>
				<textarea
					defaultValue={formState?.resources?.join(', ') || ''}
					name='resources'
					id='resourcesField'
					cols='30'
					rows='5'
					placeholder='Enter links separated by comma'
				/>
			</div>

			<label htmlFor='clearFormField' className={styles.clearFormControl}>
				<input
					className={styles.checkbox}
					type='checkbox'
					id='clearFormField'
					defaultChecked={formState?.clearForm ?? true}
					name='clearForm'
				/>
				<span>Clear form after creating?</span>
			</label>

			<Button isNeutral isDisabled={isLoading}>{submitBtnText}</Button>
		</form>
	);
};

export default QuestionForm;
