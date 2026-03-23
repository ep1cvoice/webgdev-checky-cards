import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import QuestionCardList from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import SearchInput from '../../components/SearchInput';

import styles from './HomePage.module.css';

const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [questions, setQuestions] = useState([]);

	const searchValue = searchParams.get('q') || '';
	const sortSelectValue = searchParams.get('sort') || '';
	const page = Number(searchParams.get('page')) || 1;

	const [totalPages, setTotalPages] = useState(1);
	const technology = searchParams.get('technology') || '';
	const getLimit = () => {
		if (window.innerWidth >= 1500) return 10;
		if (window.innerWidth >= 768) return 8;
		return 5;
	};
	const [limit, setLimit] = useState(getLimit());

	const [getQuestions, isLoading, error] = useFetch(async (url) => {
		const response = await fetch(`${API_URL}/${url}`);

		const total = response.headers.get('X-Total-Count');
		const data = await response.json();

		setQuestions(data);

		if (total) {
			setTotalPages(Math.ceil(total / Number(limit)));
		}

		return data;
	});

	useEffect(() => {
		const params = [];

		if (searchValue.trim()) {
			params.push(`q=${searchValue.trim()}`);
		}

		if (technology) {
			params.push(`category=${technology}`);
		}

		if (sortSelectValue) {
			const isDesc = sortSelectValue.startsWith('-');
			const field = sortSelectValue.replace('-', '');

			params.push(`_sort=${field}`);
			params.push(`_order=${isDesc ? 'desc' : 'asc'}`);
		}

		params.push(`_page=${page}`);
		params.push(`_limit=${limit}`);

		const queryString = `?${params.join('&')}`;

		getQuestions(`checkycards${queryString}`);
	}, [searchValue, technology, sortSelectValue, page, limit]);

	const onSearchChangeHandler = (e) => {
		const value = e.target.value;

		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('technology', value);
			} else {
				params.delete('technology');
			}

			params.set('page', 1);

			return params;
		});
	};

	const onSortSelectChangeHandler = (e) => {
		const value = e.target.value;

		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('sort', value);
			} else {
				params.delete('sort');
			}

			params.set('page', 1);

			return params;
		});
	};

	const handlePageChange = (newPage) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set('page', newPage);
			return params;
		});
	};

	useEffect(() => {
		const handleResize = () => {
			setLimit(getLimit());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<div className={styles.controlsContainer}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />

				<div className={styles.selectGroup}>
					<select
						value={technology}
						onChange={(e) => {
							const value = e.target.value;

							setSearchParams((prev) => {
								const params = new URLSearchParams(prev);

								if (value) {
									params.set('technology', value);
								} else {
									params.delete('technology');
								}

								params.set('page', 1);
							});
						}}
						className={styles.select}>
						<option value=''>Technology</option>
						<option value='html'>HTML</option>
						<option value='css'>CSS</option>
						<option value='javascript'>Vanilla JS</option>
						<option value='react'>React</option>
						<option value='typescript'>TypeScript</option>
						<option value='git'>Git</option>
						<option value='web'>Web Basics</option>
					</select>
					<select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={styles.select}>
						<option value=''>Sort By</option>
						<option value='level'>Level ↑</option>
						<option value='-level'>Level ↓</option>
						<option value='completed'>Completed ↑</option>
						<option value='-completed'>Completed ↓</option>
					</select>
				</div>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			{!isLoading && questions.length === 0 && (
				<div className={styles.noCardsWrapper}>
					<div className={styles.noCards}>
						<div className={styles.icon}>🔍</div>
						<h3>Nothing to see here yet</h3>
						<p>Create your first card using + Add Button</p>
					</div>
				</div>
			)}

			<QuestionCardList cards={questions} />

			<div className={styles.pagination}>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i}
						onClick={() => handlePageChange(i + 1)}
						className={`${styles.pageButton} ${page === i + 1 ? styles.active : ''}`}>
						{i + 1}
					</button>
				))}
			</div>
		</>
	);
};

export default HomePage;
