import { supabase } from '../lib/supabase';

export const createCard = async (newQuestion) => {
	const { data: { user } } = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('user_cards')
		.insert([{ ...newQuestion, user_id: user.id }])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data;
};
