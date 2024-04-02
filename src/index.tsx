import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './Context/AuthContext';
import { DarkModeProvider } from './Context/DarkModeContext';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<AuthContextProvider>
		<QueryClientProvider client={queryClient}>
			<DarkModeProvider>
				<CssBaseline />
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</DarkModeProvider>
		</QueryClientProvider>
	</AuthContextProvider>
);
