import { Box } from '@mui/material';
import GlobalStyles from './GlobalStyled';
import { Layout, MediaLayout } from './Layouts/fullLayout.style';
import Router from './Router/router';

function App() {
	return (
		<>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					bgcolor: 'background.default',
					color: 'text.primary',
				}}
			>
				<MediaLayout>
					<GlobalStyles />
					<Router />
				</MediaLayout>
			</Box>
		</>
	);
}

export default App;
