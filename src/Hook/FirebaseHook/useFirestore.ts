import {
	DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { useReducer } from 'react';
import { appFirestore, timestamp } from '../../Firebase/config';
import { FirebaseError } from 'firebase/app';

interface StoreState {
	document: DocumentReference | null;
	isPending: boolean;
	error: string | null;
	success: boolean;
}

type StoreAction =
	| { type: 'isPending' }
	| { type: 'addDoc'; payload: DocumentReference }
	| { type: 'deleteDoc'; payload: DocumentReference }
	| { type: 'error'; payload: string };

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
				document: action.payload,
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

export interface FirestoreDocument {
	uid?: string;
	id?: string;
	book?: string;
	displayName?: string;
	comments?: string;
	createdTime?: string | null;
	email?: string;
	password?: string;
}

interface FirestoreHook {
	addDocument: (doc: FirestoreDocument) => Promise<void>;
	deleteDocument: (id: string) => Promise<void>;
	response: StoreState;
}

export const useFirestore = (transaction: string): FirestoreHook => {
	const [response, dispatch] = useReducer(storeReducer, initState);
	const colRef = collection(appFirestore, transaction);
	const addDocument = async (doc: FirestoreDocument) => {
		dispatch({ type: 'isPending' });
		try {
			const createdTime = timestamp.fromDate(new Date());
			const docRef = await addDoc(colRef, { ...doc, createdTime });
			dispatch({ type: 'addDoc', payload: docRef });
			console.log(docRef);
		} catch (error) {
			const firebaseError = error as FirebaseError;
			dispatch({ type: 'error', payload: firebaseError.message });
		}
	};

	const deleteDocument = async (id: string) => {
		dispatch({ type: 'isPending' });
		try {
			const docRef = (await deleteDoc(doc(colRef, id))) as any;
			dispatch({ type: 'deleteDoc', payload: docRef });
		} catch (error) {
			const firebaseError = error as FirebaseError;
			dispatch({ type: 'error', payload: firebaseError.message });
		}
	};

	return { addDocument, deleteDocument, response };
};
