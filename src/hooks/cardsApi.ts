import { supabase } from '../lib/supabase';

export interface Card {
	id: number;
	user_id: string;
	question: string;
	category: string;
	level: number;
	priority: number;
	answer: string;
	description: string;
	resources: string[];
	completed: boolean;
	position: number | null;
	editDate: string | null;
}

export type NewCard = Omit<Card, 'id' | 'user_id' | 'position' | 'editDate'>;

export const createCard = async (newQuestion: NewCard): Promise<Card> => {
	const { data: { user } } = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('user_cards')
		.insert([{ ...newQuestion, user_id: user!.id }])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as Card;
};
