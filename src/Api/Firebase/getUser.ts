import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getUser = async (transaction: string, displayName: string) => {
	const userQuery = query(
		collection(appFirestore, transaction),
		where('displayName', '==', displayName)
	);

	try {
		const documentSnapshot = await getDocs(userQuery);
		const result = documentSnapshot.docs[0].data();
		return result;
	} catch (error) {
		console.log(error);
	}
};
