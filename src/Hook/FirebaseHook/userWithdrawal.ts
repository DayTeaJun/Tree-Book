import { deleteUser } from 'firebase/auth';
import { useAuthContext } from '../../Context/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
	setToast: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const useWithdrawal = ({ setToast, setMessage }: ProfileProps) => {
	const { user } = useAuthContext();
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();

	const withDrawal = async () => {
		try {
			if (!user) {
				setToast(true);
				setMessage('로그인 후 회원 탈퇴할 수 있습니다!');
				return;
			}
			await deleteUser(user);
			setToast(true);
			setMessage('정상적으로 계정이 삭제되었습니다!');
			dispatch({ type: 'logout' });
			navigate('/');
		} catch (error) {
			setToast(true);
			setMessage('오류로 인해 계정이 삭제되지 않았습니다!');
			console.log(error);
		}
	};
	return { withDrawal };
};
