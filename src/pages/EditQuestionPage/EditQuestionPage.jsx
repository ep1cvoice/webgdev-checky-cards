import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { supabase } from '../../lib/supabase';
import EditQuestion from './EditQuestion';

const EditQuestionPage = () => {
	const { id } = useParams();
	const [question, setQuestion] = useState(null);

	const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
		const { data, error } = await supabase
			.from('user_cards')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw new Error(error.message);
		setQuestion(data);
	});

	useEffect(() => {
		fetchQuestion();
	}, []);

	return (
		<>
			{isQuestionLoading && <Loader />}

			{question != null && <EditQuestion initialState={question} />}
		</>
	);
};

export default EditQuestionPage;
