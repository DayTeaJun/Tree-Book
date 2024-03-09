import { deleteUser } from 'firebase/auth';
import { useAuthContext } from '../../Context/useAuthContext';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

interface ProfileProps {
	setToast: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const useWithdrawal = ({ setToast, setMessage }: ProfileProps) => {
	const { user } = useAuthContext();

	const withDrawal = async () => {
		try {
			if (!user) {
				setToast(true);
				setMessage('로그인 후 회원 탈퇴할 수 있습니다!');
				return;
			}
			const uid = user.uid;
			const userRef = doc(collection(appFirestore, 'user'), uid);
			await deleteDoc(userRef);
			await deleteUser(user);
			setToast(true);
			setMessage('정상적으로 계정이 삭제되었습니다!');
		} catch (error) {
			setToast(true);
			setMessage('오류로 인해 계정이 삭제되지 않았습니다!');
			console.log(error);
		}
	};
	return { withDrawal };
};
