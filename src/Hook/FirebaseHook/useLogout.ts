import { signOut } from 'firebase/auth';
import { appAuth } from '../../Firebase/config';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { logoutAuth } from '../../Redux/authSlice';

export const useLogout = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const logout = async () => {
		try {
			await signOut(appAuth);
			dispatch(logoutAuth(null));
			enqueueSnackbar('로그아웃 되었습니다.', { variant: 'success' });
		} catch (error) {
			enqueueSnackbar('로그아웃이 실패하였습니다.', { variant: 'error' });
		}
	};
	return { logout };
};
