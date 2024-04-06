import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

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
}

export interface BookLikesProps {
	item: BookData;
	id?: string;
	search?: string;
	page?: string;
	like?: string;
	setMessage?: Dispatch<SetStateAction<string>>;
}

export interface Skeleton {
	comment?: string;
}
