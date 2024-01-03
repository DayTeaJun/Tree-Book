import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from './useFirestore';

export const useCollectionComment = (transaction: string) => {
	const [documents, setDocuments] = useState<FirestoreDocument[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(appFirestore, transaction),
				orderBy('createdTime', 'desc')
			),
			(snapshot) => {
				let result: FirestoreDocument[] = [];
				snapshot.docs.forEach((doc) => {
					const data = doc.data();
					const createdTime = data.createdTime.toDate().toLocaleString();

					result.push({
						...data,
						createdTime: createdTime,
						uid: doc.id,
					});
				});

				setDocuments(result);
				setError(null);
			},
			(error) => {
				setError(error.message);
			}
		);
		return unsubscribe;
	}, [collection]);

	return { documents, error };
};
