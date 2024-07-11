import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

export const getBestcomments = async (
	transaction: string,
	props: string,
	limitNumber: number
) => {
	let documentQuery;
	if (props === 'ratingBy') {
		documentQuery = query(
			collection(appFirestore, transaction),
			where('ratingBy', '!=', null),
			limit(limitNumber)
		);
	} else {
		documentQuery = query(
			collection(appFirestore, transaction),
			orderBy(props, 'desc'),
			limit(limitNumber)
		);
	}
	try {
		const documentSnapshot = await getDocs(documentQuery);
		let result: FirestoreDocument[] = [];
		documentSnapshot.docs.forEach((doc) => {
			const data = doc.data();
			result.push({
				...data,
				uid: doc.id,
			});
		});
		if (props === 'ratingBy') {
			result.sort(
				(a, b) =>
					Object.keys(b.ratingBy as { [key: string]: number }).length -
					Object.keys(a.ratingBy as { [key: string]: number }).length
			);
		}

		return result;
	} catch (error) {
		console.log(error);
	}
};
