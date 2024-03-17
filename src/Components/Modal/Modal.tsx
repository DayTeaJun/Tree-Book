import { M } from './modal.style';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ModalType } from '../../Types/componentType';

export const Modal = ({
	setIsOpenModal,
	isOpen,
	children,
	promise,
	mutationFn,
	setToast,
}: ModalType) => {
	const navigate = useNavigate();
	const handleConfirm = async () => {
		if (promise) {
			await promise();
			navigate('/');
		} else if (mutationFn && setToast) {
			mutationFn();
			setIsOpenModal(false);
			setToast(true);
		}
	};

	return (
		<Box sx={{ display: isOpen ? 'block' : 'none' }}>
			<M.BackDrop onClick={() => setIsOpenModal(false)} />
			<M.Container>
				<>{children}</>
				<Box sx={{ display: 'flex', gap: '3em', marginTop: '1em' }}>
					<M.Button onClick={() => handleConfirm()}>확인</M.Button>
					<M.Button onClick={() => setIsOpenModal(false)}>취소</M.Button>
				</Box>
			</M.Container>
		</Box>
	);
};
