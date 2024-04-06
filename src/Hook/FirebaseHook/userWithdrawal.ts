import { deleteUser } from 'firebase/auth';
import { useAuthContext } from '../../Context/useAuthContext';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { useSnackbar } from 'notistack';

export const useWithdrawal = () => {
	const { user } = useAuthContext();
	const { enqueueSnackbar } = useSnackbar();

	const withDrawal = async () => {
		try {
			if (!user) {
				return;
			}
			const uid = user.uid;
			const userRef = doc(collection(appFirestore, 'user'), uid);
			await deleteUser(user);
			await deleteDoc(userRef);
			enqueueSnackbar('계정이 정상적으로 삭제되었습니다.');
		} catch (error) {
			enqueueSnackbar('계정 삭제가 실패하였습니다.');
			console.log(error);
		}
	};
	return { withDrawal };
};
