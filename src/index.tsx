import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MuiProvider } from './Context/MuiContext';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<MuiProvider>
				<CssBaseline />
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</MuiProvider>
		</QueryClientProvider>
	</Provider>
);
