import { useState } from 'react';

export const useFetch = <TFn extends (...args: any[]) => Promise<any>>(
	callback: TFn,
): [(...args: Parameters<TFn>) => Promise<Awaited<ReturnType<TFn>> | undefined>, boolean, string] => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchFn = async (...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>> | undefined> => {
		try {
			setIsLoading(true);
			setError('');
			return await callback(...args);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setIsLoading(false);
		}
	};

	return [fetchFn, isLoading, error];
};
