import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { LoginType } from '../../Types/userType';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { loginAuth } from '../../Redux/authSlice';

export const useLogin = () => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const dispatch = useDispatch();
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
				enqueueSnackbar('로그인이 실패하였습니다', { variant: 'error' });
				throw new Error('로그인 실패');
			}
			dispatch(loginAuth(user));
			enqueueSnackbar('로그인되었습니다.', { variant: 'success' });
			setError(null);
			setIsPending(false);
		} catch (error) {
			setError((error as Error).message);
			setIsPending(false);
		}
	};
	return { error, isPending, login };
};
