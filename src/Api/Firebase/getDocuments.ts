import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

export const getDocuments = async (transaction: string, isbn?: string) => {
	let documentQuery;
	if (transaction === ('BooksLikes' || 'comments') && isbn) {
		documentQuery = query(
			collection(appFirestore, transaction),
			where('isbn', '==', isbn)
		);
	} else {
		documentQuery = query(
			collection(appFirestore, transaction),
			orderBy('createdTime', 'desc')
		);
	}

	const documentSnapshot = await getDocs(documentQuery);
	let result: FirestoreDocument[] = [];
	documentSnapshot.docs.map((doc) => {
		const data = doc.data();
		if (data.createdTime && transaction !== 'comments') {
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

	return result;
};
