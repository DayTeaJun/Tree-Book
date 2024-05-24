import {
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { appFirestore, timestamp } from '../../Firebase/config';
import { FirestoreDocument } from '../../Types/firestoreType';

interface FirestoreHook {
	addDocument: (doc: FirestoreDocument) => Promise<void>;
	deleteDocument: (id: string) => Promise<void>;
}

export const useFirestore = (
	transaction: string,
	name?: string
): FirestoreHook => {
	const colRef = collection(appFirestore, transaction);
	const addDocument = async (docs: FirestoreDocument) => {
		try {
			let docRef: DocumentReference<DocumentData>;
			if (name) {
				docRef = doc(colRef, name);
				await setDoc(docRef, { ...docs });
			} else {
				const createdTime = timestamp.fromDate(new Date());
				docRef = await addDoc(colRef, {
					...docs,
					createdTime,
				});
				await updateDoc(docRef, { uid: docRef.id });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteDocument = async (id: string) => {
		try {
			await deleteDoc(doc(colRef, id));
		} catch (error) {
			console.log(error);
		}
	};

	return { addDocument, deleteDocument };
};
