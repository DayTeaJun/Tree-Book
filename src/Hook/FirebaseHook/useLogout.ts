import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from '../../Context/useAuthContext';

export const useLogout = () => {
	const [error, setError] = useState<null | string>(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			await signOut(appAuth);
			dispatch({ type: 'logout' });
			setError(null);
			setIsPending(false);
		} catch (error) {
			setError(error as unknown as string);
			setIsPending(false);
		}
	};
	return { error, isPending, logout };
};
