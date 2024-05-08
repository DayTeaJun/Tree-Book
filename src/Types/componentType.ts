import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { FirestoreDocument } from './firestoreType';
import { User } from 'firebase/auth';
import { InputValueType } from './userType';

export interface ModalType {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	children: ReactNode;
	promise?: () => Promise<void>;
	mutationFn?: () => void;
}

export interface ValidInputProps {
	setInputValue: Dispatch<SetStateAction<InputValueType>>;
	setIsDisabled: Dispatch<SetStateAction<boolean>>;
}

export interface PaginaitionType {
	page?: string | number;
	searchView?: string;
	handlePageChange?: (newPage: number) => void;
	totalPage?: number;
	count?: number | null;
	menuRef?: RefObject<HTMLDivElement> | null;
}

export interface LoadingType {
	BackDrop?: boolean;
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
