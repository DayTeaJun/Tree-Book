import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ModalType {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	children: ReactNode;
	promise?: () => Promise<void>;
	mutationFn?: () => void;
}
