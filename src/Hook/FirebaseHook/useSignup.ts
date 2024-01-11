import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';
import { AuthContextProps } from '../../Context/AuthContext';
import { useFirestore } from './useFirestore';
import { useCollection } from './useCollection';

export interface SignupType {
	email: string;
	password: string;
	displayName: string;
	photoURL?: string;
}
export const useSignup = () => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext() as AuthContextProps;
	const { addDocument, response } = useFirestore('user');
	const { documents } = useCollection('user');

	const signup = async ({ email, password, displayName }: SignupType) => {
		try {
			setError(null);
			setIsPending(true);

			const userCreadential = await createUserWithEmailAndPassword(
				appAuth,
				email,
				password
			);

			addDocument({
				email,
				password,
				displayName,
			});

			const user = userCreadential.user;
			if (!user) {
				throw new Error('회원가입 실패');
			}
			if (appAuth.currentUser) {
				try {
					await updateProfile(appAuth.currentUser, { displayName });
					dispatch({ type: 'login', payload: user });
					setError(null);
					setIsPending(false);
				} catch (error) {
					setError((error as Error).message);
					setIsPending(false);
				}
			}
		} catch (error) {
			setError((error as Error).message);
			setIsPending(false);
		}
	};
	return { error, isPending, signup };
};
