import { Dispatch, ReactNode, SetStateAction } from 'react';
import { BookData } from './bookType';
import { FirestoreDocument } from './firestoreType';
import { User } from 'firebase/auth';

export interface ModalType {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	children: ReactNode;
	promise?: () => Promise<void>;
	mutationFn?: () => void;
}

export interface CommentItemType {
	index: number;
	commentData: FirestoreDocument;
	user: User | null;
	documents: FirestoreDocument[];
	isbn: string;
	setIsCommentEdit?: Dispatch<SetStateAction<boolean>>;
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
