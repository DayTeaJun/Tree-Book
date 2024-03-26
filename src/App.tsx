import { Box } from '@mui/material';
import GlobalStyles from './GlobalStyled';
import Router from './Router/router';

function App() {
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
