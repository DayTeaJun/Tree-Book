import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from '../../Context/useAuthContext';
import { LoginType } from '../../Types/userType';
import { useSnackbar } from 'notistack';

export const useLogin = () => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const { enqueueSnackbar } = useSnackbar();

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
				enqueueSnackbar('로그인이 실패하였습니다');
				throw new Error('로그인 실패');
			}
			dispatch({ type: 'login', payload: user });
			enqueueSnackbar('로그인되었습니다.');
			setError(null);
			setIsPending(false);
		} catch (error) {
			setError((error as Error).message);
			setIsPending(false);
		}
	};
	return { error, isPending, login };
};
