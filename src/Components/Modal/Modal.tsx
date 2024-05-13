import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ModalType } from '../../Types/componentType';
import { useMediaQueries } from '../../Hook/useMediaQueries';

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
	const { isDownMD } = useMediaQueries();

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
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
					padding: `${isDownMD ? '1em' : '2em'}`,
					backgroundColor: 'background.default',
					borderRadius: '10px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '1em',
					zIndex: 999,
				}}
			>
				<>{children}</>
				<Box
					sx={{
						display: 'flex',
						gap: `${isDownMD ? '2em' : '3em'}`,
					}}
				>
					<Box
						component='button'
						sx={{
							display: 'flex',
							alignItems: 'center',
							backgroundColor: 'background.btn',
							color: '#fff',
							gap: '1em',
							fontSize: `${isDownMD ? '0.8em' : '1.1em'}`,
							fontWeight: 'bold',
							border: 'none',
							padding: `${isDownMD ? '8px' : '12px 16px'}`,
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
							fontSize: `${isDownMD ? '0.8em' : '1.1em'}`,
							fontWeight: 'bold',
							border: 'none',
							padding: `${isDownMD ? '8px' : '12px 16px'}`,
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
