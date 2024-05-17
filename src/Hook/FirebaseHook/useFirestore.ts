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
import { useReducer } from 'react';
import { appFirestore, timestamp } from '../../Firebase/config';
import { FirebaseError } from 'firebase/app';
import {
	FirestoreDocument,
	StoreAction,
	StoreState,
} from '../../Types/firestoreType';

const initState: StoreState = {
	document: null,
	isPending: false,
	error: null,
	success: false,
};

const storeReducer = (state: StoreState, action: StoreAction) => {
	switch (action.type) {
		case 'isPending':
			return { isPending: true, document: null, success: false, error: null };
		case 'addDoc':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			};

		case 'deleteDoc':
			return {
				isPending: false,
				document: null,
				success: true,
				error: null,
			};

		case 'error':
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

interface FirestoreHook {
	addDocument: (doc: FirestoreDocument) => Promise<void>;
	deleteDocument: (id: string) => Promise<void>;
	response: StoreState;
}

export const useFirestore = (
	transaction: string,
	name?: string
): FirestoreHook => {
	const [response, dispatch] = useReducer(storeReducer, initState);
	const colRef = collection(appFirestore, transaction);
	const addDocument = async (docs: FirestoreDocument) => {
		dispatch({ type: 'isPending' });
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

			dispatch({ type: 'addDoc', payload: docRef });
		} catch (error) {
			const firebaseError = error as FirebaseError;
			dispatch({ type: 'error', payload: firebaseError.message });
		}
	};

	const deleteDocument = async (id: string) => {
		dispatch({ type: 'isPending' });
		try {
			await deleteDoc(doc(colRef, id));
			dispatch({ type: 'deleteDoc', payload: null });
		} catch (error) {
			const firebaseError = error as FirebaseError;
			dispatch({ type: 'error', payload: firebaseError.message });
		}
	};

	return { addDocument, deleteDocument, response };
};
