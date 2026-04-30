import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuestionCardList from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import SearchInput from '../../components/SearchInput';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

import styles from './HomePage.module.css';

const applyCardsOrdering = (query, sort, includePosition = true) => {
	if (sort) {
		const isDesc = sort.startsWith('-');
		const field = sort.replace('-', '');
		query = query.order(field, { ascending: !isDesc });
	} else if (includePosition) {
		query = query.order('position', { ascending: true, nullsFirst: false });
	}

	return query.order('id', { ascending: true });
};

const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [questions, setQuestions] = useState([]);
	const { isAuth, hasUserCards, copyCards } = useAuth();
	const [isCopying, setIsCopying] = useState(false);
	const [copyError, setCopyError] = useState('');

	const searchValue = searchParams.get('q') || '';
	const sortSelectValue = searchParams.get('sort') || '';
	const page = Number(searchParams.get('page')) || 1;

	const [totalPages, setTotalPages] = useState(1);
	const technology = searchParams.get('technology') || '';
	const getLimit = () => {
		if (window.innerWidth >= 1800) return 18;
		if (window.innerWidth >= 1500) return 15;
		if (window.innerWidth >= 768) return 8;
		return 5;
	};
	const [limit, setLimit] = useState(getLimit());

	const table = isAuth && hasUserCards ? 'user_cards' : 'cards';

	const effectiveSort = table === 'cards' && sortSelectValue.includes('completed') ? '' : sortSelectValue;

	const [getQuestions, isLoading, error] = useFetch(async ({ search, category, sort, currentPage, currentLimit, activeTable }) => {
		const from = (currentPage - 1) * currentLimit;
		const to = from + currentLimit - 1;

		const isMissingPositionColumnError = (err) => {
			const message = err?.message?.toLowerCase() || '';
			return message.includes('position') && (message.includes('column') || message.includes('schema cache'));
		};

		const buildQuery = (includePosition = true) => {
			let query = supabase.from(activeTable).select('*', { count: 'exact' });

			if (search) {
				query = query.or(`question.ilike.%${search}%,answer.ilike.%${search}%,description.ilike.%${search}%`);
			}

			if (category) {
				query = query.eq('category', category);
			}

			query = applyCardsOrdering(query, sort, includePosition);

			return query.range(from, to);
		};

		let { data, count, error: queryError } = await buildQuery(true);

		if (queryError && isMissingPositionColumnError(queryError)) {
			({ data, count, error: queryError } = await buildQuery(false));
		}

		if (queryError) throw new Error(queryError.message);

		setQuestions(data || []);
		if (count !== null) {
			setTotalPages(Math.ceil(count / currentLimit));
		}

		return data;
	});

	useEffect(() => {
		getQuestions({
			search: searchValue.trim(),
			category: technology,
			sort: effectiveSort,
			currentPage: page,
			currentLimit: limit,
			activeTable: table,
		});
	}, [searchValue, technology, sortSelectValue, page, limit, table]);

	const handleCopyCards = async () => {
		setIsCopying(true);
		setCopyError('');
		try {
			await copyCards();
		} catch {
			setCopyError('Something went wrong. Please try again.');
		} finally {
			setIsCopying(false);
		}
	};

	const onSearchChangeHandler = (e) => {
		const value = e.target.value;

		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('q', value);
			} else {
				params.delete('q');
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

	const getPageNumbers = (current, total) => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

		const pages = [];
		const addPage = (n) => pages.push(n);
		const addEllipsis = () => pages.push('...');

		addPage(1);

		if (current <= 4) {
			for (let i = 2; i <= Math.min(5, total - 1); i++) addPage(i);
			addEllipsis();
		} else if (current >= total - 3) {
			addEllipsis();
			for (let i = Math.max(total - 4, 2); i <= total - 1; i++) addPage(i);
		} else {
			addEllipsis();
			for (let i = current - 1; i <= current + 1; i++) addPage(i);
			addEllipsis();
		}

		addPage(total);
		return pages;
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
			{isAuth && !hasUserCards && (
				<div className={styles.startBanner}>
					<div className={styles.startBannerInner}>
						<p>You&apos;re viewing the default cards. Start your own deck to track progress, edit, and add cards. You can delete all your cards and start over anytime in <strong>Settings</strong>.</p>
						<button
							className={styles.startBtn}
							onClick={handleCopyCards}
							disabled={isCopying}>
							{isCopying ? 'Copying cards…' : '▶ Start with these cards'}
						</button>
						{copyError && <p className={styles.copyError}>{copyError}</p>}
					</div>
				</div>
			)}

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

								return params;
							});
						}}
						className={styles.select}>
						<option value=''>Technology</option>
						<option value='html'>HTML</option>
						<option value='css'>CSS</option>
						<option value='javascript'>Vanilla JS</option>
						<option value='react'>React</option>
						<option value='typescript'>TypeScript</option>
						<option value='node'>Node.js</option>
						<option value='next'>Next.js</option>
						<option value='web'>Web Basics</option>
						<option value='git'>Git</option>
						<option value='devops'>DevOps</option>
						<option value='backend'>Backend</option>
						<option value='other'>Other</option>
					</select>
					<select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={styles.select}>
						<option value=''>Sort By</option>
						<option value='priority'>Priority ↑</option>
						<option value='-priority'>Priority ↓</option>
						<option value='level'>Level ↑</option>
						<option value='-level'>Level ↓</option>
						{table === 'user_cards' && <option value='completed'>Completed ↑</option>}
						{table === 'user_cards' && <option value='-completed'>Completed ↓</option>}
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
				{getPageNumbers(page, totalPages).map((p, i) =>
					p === '...' ? (
						<span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
					) : (
						<button
							key={p}
							onClick={() => handlePageChange(p)}
							className={`${styles.pageButton} ${page === p ? styles.active : ''}`}>
							{p}
						</button>
					)
				)}
			</div>
		</>
	);
};

export default HomePage;
