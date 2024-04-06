import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ModalType } from '../../Types/componentType';

export const Modal = ({
	setIsOpenModal,
	isOpen,
	children,
	promise,
	mutationFn,
}: ModalType) => {
	const navigate = useNavigate();
	const handleConfirm = async () => {
		if (promise) {
			await promise();
			navigate('/');
		} else if (mutationFn) {
			mutationFn();
			setIsOpenModal(false);
		}
	};

	return (
		<Box sx={{ display: isOpen ? 'block' : 'none' }}>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					backgroundColor: 'rgba(0, 0, 0, 0.35)',
				}}
				onClick={() => setIsOpenModal(false)}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
					padding: '3em 4em',
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '1em',
				}}
			>
				<>{children}</>
				<Box sx={{ display: 'flex', gap: '3em', marginTop: '1em' }}>
					<Box
						component='button'
						sx={{
							display: 'flex',
							alignItems: 'center',
							backgroundColor: 'background.btn',
							color: '#fff',
							gap: '1em',
							fontSize: '1.1em',
							fontWeight: 'bold',
							border: 'none',
							padding: '1em 2em',
							cursor: 'pointer',
							'&:hover': { backgroundColor: 'background.btnhover' },
						}}
						onClick={() => handleConfirm()}
					>
						확인
					</Box>
					<Box
						component='button'
						sx={{
							display: 'flex',
							alignItems: 'center',
							backgroundColor: 'background.btn',
							color: '#fff',
							gap: '1em',
							fontSize: '1.1em',
							fontWeight: 'bold',
							border: 'none',
							padding: '1em 2em',
							cursor: 'pointer',
							'&:hover': { backgroundColor: 'background.btnhover' },
						}}
						onClick={() => setIsOpenModal(false)}
					>
						취소
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
