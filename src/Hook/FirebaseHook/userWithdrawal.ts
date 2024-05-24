import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { useSnackbar } from 'notistack';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useWithdrawal = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const withDrawal = async () => {
		try {
			if (!user) {
				enqueueSnackbar(
					'로그인하지 않은 상태에서는 계정 삭제가 불가능 합니다!',
					{
						variant: 'error',
					}
				);
				return navigate('/');
			}
			const uid = user.uid;
			const userRef = doc(collection(appFirestore, 'user'), uid);
			await deleteUser(user);
			await deleteDoc(userRef);
			enqueueSnackbar('계정이 정상적으로 삭제되었습니다.', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('계정 삭제가 실패하였습니다.', { variant: 'error' });
			console.log(error);
		}
	};
	return { withDrawal };
};
