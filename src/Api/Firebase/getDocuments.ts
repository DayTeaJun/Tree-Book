import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

export const getDocuments = async (transaction: string) => {
	const documentQuery = query(
		collection(appFirestore, transaction),
		orderBy('createdTime', 'desc')
	);
	const documentSnapshot = await getDocs(documentQuery);
	let result: FirestoreDocument[] = [];
	documentSnapshot.docs.map((doc) => {
		const data = doc.data();
		if (data.createdTime) {
			const createdTime = data.createdTime.toDate().toLocaleString();
			result.push({
				...data,
				createdTime: createdTime,
				uid: doc.id,
			});
		} else {
			result.push({
				...data,
				uid: doc.id,
			});
		}
	});
	console.log(result);

	return result;
};
