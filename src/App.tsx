import GlobalStyles from './GlobalStyled';
import { Layout } from './Layouts/fullLayout.style';
import Router from './Router/Router';

function App() {
	return (
		<>
			<Layout>
				<GlobalStyles />
				<Router />
			</Layout>
		</>
	);
}

export default App;
