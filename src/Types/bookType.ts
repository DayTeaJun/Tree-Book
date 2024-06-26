import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { FirestoreDocument } from './firestoreType';

export interface BookData {
	authors: string[];
	contents: string;
	datetime: string;
	isbn: string;
	price: number;
	publisher: string;
	sale_price: number;
	status: string;
	thumbnail: string;
	title: string;
	translators: string[];
	url: string;
	id?: number;
	search?: string;
	page?: string;
	comments?: string;
	createdTime?: Timestamp;
	rating?: number;
	ratingBy?: { [key: string]: number };
	likeBy?: { [key: string]: boolean };
	checked?: boolean;
	displayName?: string;
}

export interface SerachParams {
	query: string;
	size: number;
	target: string;
}

export interface BookItemProps {
	item: BookData;
	search?: string;
	id?: number;
	page?: string;
	like?: string;
	comment?: string;
	publisher?: string;
	profile?: string;
}

export interface BookLikesProps {
	item: BookData;
	id?: string;
	search?: string;
	page?: string;
	like?: string;
	setMessage?: Dispatch<SetStateAction<string>>;
	likedBook?: FirestoreDocument[];
	preComment?: FirestoreDocument;
	setIsCommentEdit?: Dispatch<SetStateAction<boolean>>;
}

export interface Skeleton {
	comment?: string;
}
