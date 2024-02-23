import { FirestoreDocument } from './firestoreType';

export interface UserLikedProps {
	uid?: string;
	displayName?: string | null;
}

export interface SignupType {
	email: string;
	password: string;
	displayName: string;
	imgUrl?: Blob;
	intro?: string;
}

export interface LoginType {
	email: string;
	password: string;
}

export interface InputValueType {
	email: string;
	password: string;
	displayName: string;
	intro: string;
}

export interface CommentType {
	item?: FirestoreDocument;
	book?: string;
	comments?: string;
	createdTime?: string;
	displayName?: string;
	id?: string;
	isbn?: string;
	photoURL?: string;
	uid?: string;
	likeBy?: { [key: string]: boolean };
}
