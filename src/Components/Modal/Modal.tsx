import { Dispatch, ReactNode, SetStateAction } from 'react';
import { M } from './modal.style';

interface ModalType {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	children: ReactNode;
}

export const Modal = ({ setIsOpenModal, isOpen, children }: ModalType) => {
	return (
		<div style={{ display: isOpen ? 'block' : 'none' }}>
			<M.BackDrop />
			<M.Container>
				<>{children}</>
				<button onClick={() => setIsOpenModal(false)}>닫기</button>
			</M.Container>
		</div>
	);
};
