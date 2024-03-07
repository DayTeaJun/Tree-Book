import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

export const getComments = async (transaction: string, isbn: string) => {
	const documentQuery = query(
		collection(appFirestore, transaction),
		where('isbn', '==', isbn)
	);
	const documentSnapshot = await getDocs(documentQuery);
	let result: FirestoreDocument[] = [];
	documentSnapshot.docs.map((doc) => {
		const data = doc.data();
		result.push({
			...data,
			uid: doc.id,
		});
	});

	return result;
};
