import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { supabase } from '../../lib/supabase';
import type { Card } from '../../hooks/cardsApi';
import EditQuestion from './EditQuestion';

const EditQuestionPage = () => {
	const { id } = useParams<{ id: string }>();
	const [question, setQuestion] = useState<Card | null>(null);

	const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
		const { data, error } = await supabase
			.from('user_cards')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw new Error(error.message);
		setQuestion(data as Card);
	});

	useEffect(() => {
		fetchQuestion();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isQuestionLoading && <Loader />}

			{question != null && <EditQuestion initialState={question} />}
		</>
	);
};

export default EditQuestionPage;
