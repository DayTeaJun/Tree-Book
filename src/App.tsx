import GlobalStyles from './GlobalStyled';
import { Layout, MediaLayout } from './Layouts/fullLayout.style';
import Router from './Router/Router';

function App() {
	return (
		<>
			<Layout>
				<MediaLayout>
					<GlobalStyles />
					<Router />
				</MediaLayout>
			</Layout>
		</>
	);
}

export default App;
