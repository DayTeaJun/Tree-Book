import {
	DocumentData,
	collection,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const useCollection = async (
	transaction: string,
	uid?: number | string
) => {
	const documentQuery = query(
		collection(appFirestore, transaction),
		orderBy('createdTime', 'desc')
	);
	const documentSnapshot = await getDocs(documentQuery);
	const result = documentSnapshot.docs.map((doc) => {
		return doc.data();
	});

	return { result };
};
