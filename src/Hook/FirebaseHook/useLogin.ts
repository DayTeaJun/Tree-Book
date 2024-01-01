import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';

export interface LoginType {
	email: string;
	password: string;
}

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const login = ({ email, password }: LoginType) => {
		setError(null);
		setIsPending(true);

		signInWithEmailAndPassword(appAuth, email, password)
			.then((userCreadential) => {
				const user = userCreadential.user;
				dispatch({ type: 'login', payload: user });
				setError(null);
				setIsPending(false);
				console.log(user);
				if (!user) {
					throw new Error('로그인 실패');
				}
			})
			.catch((err) => {
				setError(err.message);
				setIsPending(false);
			});
	};
	return { error, isPending, login };
};
