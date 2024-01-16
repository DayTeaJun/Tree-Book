import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFirestore } from '../../Firebase/config';
import { FirestoreDocument } from './useFirestore';

export const useCollection = (transaction: string) => {
	const [documents, setDocuments] = useState<FirestoreDocument[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(appFirestore, transaction),
				orderBy('createdTime', 'desc')
			),
			(snapshot) => {
				setIsLoading(true);
				let result: FirestoreDocument[] = [];
				snapshot.docs.forEach((doc) => {
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

				setDocuments(result);
				setError(null);
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
			}
		);
		return unsubscribe;
	}, [collection]);

	return { documents, error, isLoading };
};
