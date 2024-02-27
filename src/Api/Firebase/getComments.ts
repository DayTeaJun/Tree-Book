import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

export const getComments = async (transaction: string) => {
	const documentQuery = query(
		collection(appFirestore, transaction),
		orderBy('createdTime', 'desc')
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