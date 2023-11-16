import GlobalStyles from './GlobalStyled';
import SearchMain from './Pages/SearchPage/SearchMain';

// 컴포넌트의 리턴값인 JSX에 대한 타입 지정
function App() {
	return (
		<>
			<GlobalStyles />
			<SearchMain />
		</>
	);
}

export default App;
