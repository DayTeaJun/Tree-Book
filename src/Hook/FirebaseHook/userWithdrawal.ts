import { deleteUser, getAuth } from 'firebase/auth';
import { useAuthContext } from '../../Context/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useWithdrawal = () => {
	const { user } = useAuthContext();
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();

	const withDrawal = async () => {
		try {
			if (!user) {
				return alert('로그인 후 회원 탈퇴할 수 있습니다!');
			}
			await deleteUser(user);
			alert('정상적으로 계정이 삭제되었습니다!');
			dispatch({ type: 'logout' });
			navigate('/');
		} catch (error) {
			alert('오류로 인해 계정이 삭제되지 않았습니다!');
			console.log(error);
		}
	};
	return { withDrawal };
};
