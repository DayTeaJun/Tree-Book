import { useEffect } from 'react';
import { T } from './toast.style';
import { useNavigate } from 'react-router-dom';

export default function ToastPopup({
	message,
	setToast,
	position,
	page,
}: {
	message: string;
	setToast: React.Dispatch<React.SetStateAction<boolean>>;
	position: 'top' | 'bottom';
	page?: ['profile', string];
}) {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			setToast(false);
			if (page && page[0] === 'profile') {
				navigate(`/profile/${page[1]}`);
			}
		}, 1500);
		return () => {
			clearTimeout(timer);
		};
	}, [setToast]);

	return (
		<T.Container position={position}>
			<T.P>{message}</T.P>
		</T.Container>
	);
}