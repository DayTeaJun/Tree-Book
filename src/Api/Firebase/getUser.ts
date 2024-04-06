import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { UserProfileType } from '../../Types/userType';

export const getUser = async (
	transaction: string,
	displayName?: string
): Promise<UserProfileType | null> => {
	const userQuery = query(
		collection(appFirestore, transaction),
		where('displayName', '==', displayName)
	);

	const documentSnapshot = await getDocs(userQuery);
	let result: UserProfileType | null = null;
	documentSnapshot.forEach((doc) => {
		const data = doc.data();
		result = data as UserProfileType;
	});

	return result;
};
