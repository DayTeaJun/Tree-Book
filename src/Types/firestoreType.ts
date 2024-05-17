import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';

export interface StoreState {
	document: DocumentReference<DocumentData> | null;
	isPending: boolean;
	error: string | null;
	success: boolean;
}

export type StoreAction =
	| { type: 'isPending' }
	| { type: 'addDoc'; payload: DocumentReference<DocumentData> }
	| { type: 'deleteDoc'; payload: null }
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
	views?: number;
	fixedComment?: boolean;
	rating?: number;
	ratingBy?: { [key: string]: number };
}
