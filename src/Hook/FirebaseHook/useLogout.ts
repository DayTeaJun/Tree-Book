import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = () => {
		setError(null);
		setIsPending(true);

		signOut(appAuth)
			.then(() => {
				dispatch({ type: 'logout' });
				setError(null);
				setIsPending(false);
			})
			.catch((error) => {
				setError(error.message);
				setIsPending(false);
			});
	};
	return { error, isPending, logout };
};
