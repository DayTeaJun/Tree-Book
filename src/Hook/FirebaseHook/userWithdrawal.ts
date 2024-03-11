import { deleteUser } from 'firebase/auth';
import { useAuthContext } from '../../Context/useAuthContext';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const useWithdrawal = () => {
	const { user } = useAuthContext();

	const withDrawal = async () => {
		try {
			if (!user) {
				return;
			}
			const uid = user.uid;
			const userRef = doc(collection(appFirestore, 'user'), uid);
			await deleteUser(user);
			await deleteDoc(userRef);
		} catch (error) {
			console.log(error);
		}
	};
	return { withDrawal };
};
