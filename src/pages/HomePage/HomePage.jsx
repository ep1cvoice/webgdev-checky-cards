import { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../../constants';

import QuestionCardList from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import SearchInput from '../../components/SearchInput';

import styles from './HomePage.module.css';

const HomePage = () => {
	const [questions, setQuestions] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [sortSelectValue, setSortSelectValue] = useState('');
	const [filterSelectValue, setFilterSelectValue] = useState('');

	const [getQuestions, isLoading, error] = useFetch(async (url) => {
		const response = await fetch(`${API_URL}/${url}`);
		const data = await response.json();

		setQuestions(data);
		return data;
	});

	const cards = useMemo(() => {
		return (questions || []).filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
	}, [questions, searchValue]);

	useEffect(() => {
		const params = [];

		if (filterSelectValue) {
			params.push(`category=${filterSelectValue}`);
		}

		if (sortSelectValue) {
			params.push(`_sort=${sortSelectValue}`);
		}

		const queryString = params.length ? `?${params.join('&')}` : '';

		getQuestions(`checkycards${queryString}`);
	}, [filterSelectValue, sortSelectValue]);

	const onSearchChangeHandler = (e) => {
		setSearchValue(e.target.value);
	};

	const onSortSelectChangeHandler = (e) => {
		setSortSelectValue(e.target.value);
	};
	const onFilterSelectChangeHandler = (e) => {
		setFilterSelectValue(e.target.value);
	};

	return (
		<>
			<div className={styles.controlsContainer}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />

				<div className={styles.selectGroup}>
					<select value={filterSelectValue} onChange={onFilterSelectChangeHandler} className={styles.select}>
						<option value=''>technology</option>
						<option value='js'>Vanilla JS</option>
						<option value='react'>React</option>
						<option value='angular'>Angular</option>
						<option value='vue'>Vue</option>
						<option value='node'>Node.js</option>
						<option value='next'>Next.js</option>
					</select>
					<select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={styles.select}>
						<option value=''>sort by</option>
						<option value='level'>LVL asc</option>
						<option value='-level'>LVL desc</option>
						<option value='completed'>completed asc</option>
						<option value='-completed'>not completed desc</option>
					</select>
				</div>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			{cards.length === 0 && (
				<div className={styles.noCardsWrapper}>
					<div className={styles.noCards}>
						<div className={styles.icon}>🔍</div>
						<h3>No results found</h3>
						<p>Try adjusting your search phrase.</p>
					</div>
				</div>
			)}

			<QuestionCardList cards={cards} />
		</>
	);
};

export default HomePage;
