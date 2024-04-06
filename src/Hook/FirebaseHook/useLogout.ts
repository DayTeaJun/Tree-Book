import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from '../../Context/useAuthContext';
import { useSnackbar } from 'notistack';

export const useLogout = () => {
	const [error, setError] = useState<null | string>(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const { enqueueSnackbar } = useSnackbar();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			await signOut(appAuth);
			dispatch({ type: 'logout' });
			enqueueSnackbar('로그아웃 되었습니다.');
			setError(null);
			setIsPending(false);
		} catch (error) {
			enqueueSnackbar('로그아웃이 실패하였습니다.');
			setError(error as unknown as string);
			setIsPending(false);
		}
	};
	return { error, isPending, logout };
};
