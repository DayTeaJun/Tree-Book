import { Box } from '@mui/material';
import GlobalStyles from './GlobalStyled';
import Router from './Router/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth } from './Firebase/config';
import { setAuth } from './Redux/authSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(appAuth, (user) => {
			dispatch(setAuth(user));
		});
		return unsubscribe;
	}, [dispatch]);

	return (
		<>
			<Box
				sx={{
					position: 'relative',
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					bgcolor: 'background.default',
					color: 'text.primary',
				}}
			>
				<GlobalStyles />
				<Router />
			</Box>
		</>
	);
}

export default App;
