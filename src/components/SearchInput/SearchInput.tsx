import { useId } from 'react';
import type { ChangeEventHandler } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
	const inputId = useId();

	return (
		<div className={styles.inputContainer}>
			<label htmlFor={inputId}>
				<Search className={styles.searchIcon} />
				{value !== '' && (
					<X
						className={styles.closeIcon}
						onClick={(e) => {
							e.preventDefault();
							onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
						}}
					/>
				)}
			</label>
			<input
				className={styles.input}
				type='text'
				id={inputId}
				placeholder='Search for...'
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchInput;
