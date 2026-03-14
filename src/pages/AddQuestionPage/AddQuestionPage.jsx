import  Button  from '../../components/Button'
import styles from './AddQuestionPage.module.css';

const AddQuestionPage = () => {
	return (
		<>
			<h1 className={styles.formTitle}>Add new card</h1>

			<div className={styles.formContainer}>
				<form action='' className={styles.form}>
					<div className={styles.formWrapper}>
						<label htmlFor='questionField'>Question: </label>
						<textarea
							defaultValue={'defaultValue'}
							name='question'
							id='questionField'
							cols='30'
							rows='2'
							required
							placeholder='Enter question title'></textarea>
					</div>
					<div className={styles.formWrapper}>
						<label htmlFor='categoryField'>Category: </label>
						<select name='category' id='categoryField'>
							<option disabled value=''>
								Choose Category
							</option>
							<option value='javascript'>Vanilla JS</option>
							<option value='react'>React</option>
							<option value='angular'>Angular</option>
							<option value='vue'>Vue</option>
							<option value='node'>Node.js</option>
							<option value='next'>Next.js</option>
						</select>
					</div>

					<div className={styles.formWrapper}>
						<label htmlFor='levelField'>Level:</label>
						<select name='level' id='levelField'>
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
						<label htmlFor='answerField'>Short Answer: </label>
						<textarea
							defaultValue={'defaultValue'}
							name='answer'
							id='answerField'
							cols='30'
							rows='2'
							required
							placeholder='Enter a short answer'></textarea>
					</div>
					<div className={styles.formWrapper}>
						<label htmlFor='descriptionField'>Full Description: </label>
						<textarea
							defaultValue={'defaultValue'}
							name='description'
							id='descriptionField'
							cols='30'
							rows='5'
							required
							placeholder='Enter a full description'></textarea>
					</div>
					<div className={styles.formWrapper}>
						<label htmlFor='resourcesField'>Links: </label>
						<textarea
							defaultValue={'defaultValue'}
							name='resources'
							id='resourcesField'
							cols='30'
							rows='5'
							required
							placeholder='Enter links separated by comma'></textarea>
					</div>

                    
						<label htmlFor='clearFormField' className={styles.clearFormControl}>
                            <input className = {styles.checkbox}type="checkbox" id = 'clearFormField' defaultValue={true} name ='clearForm'/>
                            <span>Clear form after creating?</span>
                        </label>
					<Button>Create New Card</Button>
				</form>
			</div>
		</>
	);
};

export default AddQuestionPage;
