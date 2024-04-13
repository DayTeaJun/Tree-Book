import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

export const getBestcomments = async (transaction: string, props: string) => {
	const documentQuery = query(
		collection(appFirestore, transaction),
		orderBy(props, 'asc'),
		limit(5)
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
