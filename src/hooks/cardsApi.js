import { supabase } from '../lib/supabase';

export const createCard = async (newQuestion) => {
	const { data, error } = await supabase
		.from('checkycards')
		.insert([newQuestion])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data;
};
