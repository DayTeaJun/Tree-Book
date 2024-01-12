import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';

export interface LoginType {
	email: string;
	password: string;
}

export const useLogin = () => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async ({ email, password }: LoginType) => {
		try {
			setError(null);
			setIsPending(true);
			const userCreadential = await signInWithEmailAndPassword(
				appAuth,
				email,
				password
			);

			const user = userCreadential.user;
			if (!user) {
				throw new Error('로그인 실패');
			}
			dispatch({ type: 'login', payload: user });
			setError(null);
			setIsPending(false);
		} catch (error) {
			setError((error as Error).message);
			setIsPending(false);
		}
	};
	return { error, isPending, login };
};
