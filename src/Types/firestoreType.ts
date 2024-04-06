import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface StoreState {
	document: DocumentReference | null;
	isPending: boolean;
	error: string | null;
	success: boolean;
}

export type StoreAction =
	| { type: 'isPending' }
	| { type: 'addDoc'; payload: DocumentReference }
	| { type: 'deleteDoc'; payload: DocumentReference }
	| { type: 'error'; payload: string };

export interface FirestoreDocument {
	uid?: string;
	id?: string;
	book?: string;
	displayName?: string;
	comments?: string;
	createdTime?: Timestamp;
	email?: string;
	password?: string;
	photoURL?: string;
	isbn?: string;
	like?: boolean;
	likeBy?: { [key: string]: boolean };
	intro?: string;
	search?: string;
	page?: string;
}
