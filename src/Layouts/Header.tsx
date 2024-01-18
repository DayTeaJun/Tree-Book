import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { H } from './Header.style';
import { useAuthContext } from '../Hook/FirebaseHook/useAuthContext';
import { useLogout } from '../Hook/FirebaseHook/useLogout';

export default function Header() {
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
			<H.Header>
				<H.LinkHome to='/'>Tree Book</H.LinkHome>
				<H.Container>
					<H.Form onSubmit={handleSubmit}>
						<H.Label htmlFor='searchTtitle'>도서 검색창</H.Label>
						<H.Input
							id='searchTtitle'
							type='text'
							ref={inputRef}
							spellCheck='false'
							placeholder='책 이름을 입력해주세요.'
						/>
					</H.Form>
				</H.Container>
				{isAuthReady && !user && (
					<H.Strong>
						<H.ALink to='/signup'>회원가입</H.ALink>
						<Link to='/login'>로그인</Link>
					</H.Strong>
				)}
				{isAuthReady && user && (
					<H.Strong>
						<H.ALink to='/profile'>내 프로필</H.ALink>
						<a onClick={logout}>로그아웃</a>
					</H.Strong>
				)}
			</H.Header>
		</>
	);
}
