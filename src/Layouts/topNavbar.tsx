import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopNavbarStyle } from './topNavbar.style';
import { useAuthContext } from '../Hook/FirebaseHook/useAuthContext';
import { useLogout } from '../Hook/FirebaseHook/useLogout';

export default function TopNavbar() {
	const [searchTitle, setSearchTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { isAuthReady, user } = useAuthContext();
	const { error, isPending, logout } = useLogout();

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (!inputRef.current) return;
		setSearchTitle(inputRef.current.value);
	};

	useEffect(() => {
		if (searchTitle !== '') {
			navigate(`/search/${searchTitle}`);
			setSearchTitle('');
		}
	}, [searchTitle]);

	return (
		<>
			<TopNavbarStyle $formTag={true} $linkTag={true}>
				<Link to='/' />
				<form onSubmit={handleSubmit}>
					<label htmlFor='searchTtitle'>도서 검색창</label>
					<input
						id='searchTtitle'
						type='text'
						ref={inputRef}
						spellCheck='false'
					/>
					<button>검색</button>
				</form>
				{isAuthReady && !user && (
					<strong>
						<Link to='/signup'>회원가입</Link> | <Link to='/login'>로그인</Link>
					</strong>
				)}
				{isAuthReady && user && (
					<strong>
						<a onClick={logout}>로그아웃</a>
					</strong>
				)}
			</TopNavbarStyle>
		</>
	);
}
