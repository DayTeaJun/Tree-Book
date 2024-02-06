import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getDocuments = async (transaction: string) => {
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
