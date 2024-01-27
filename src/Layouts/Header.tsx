import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { H } from './Header.style';
import { useAuthContext } from '../Hook/FirebaseHook/useAuthContext';
import { useLogout } from '../Hook/FirebaseHook/useLogout';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PortraitIcon from '@mui/icons-material/Portrait';
import SearchIcon from '@mui/icons-material/Search';

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
			navigate(`/search/${searchTitle}/1`);
			setSearchTitle('');
		}
	}, [searchTitle]);

	return (
		<>
			<H.Header>
				<H.LinkHome to='/'>Tree Book</H.LinkHome>
				<H.Form onSubmit={handleSubmit}>
					<H.Label htmlFor='searchTtitle'>도서 검색창</H.Label>
					<H.Input
						id='searchTtitle'
						type='text'
						ref={inputRef}
						spellCheck='false'
						placeholder='책 이름을 입력해주세요.'
					/>
					<H.Button>
						<SearchIcon />
					</H.Button>
				</H.Form>
				{isAuthReady && !user && (
					<H.Container>
						<H.ALink to='/signup'>
							회원가입
							<PortraitIcon />
						</H.ALink>
						<H.ALink to='/login'>
							로그인
							<LoginIcon />
						</H.ALink>
					</H.Container>
				)}
				{isAuthReady && user && (
					<H.Container>
						<H.ALink to={`/profile/${user.displayName}`}>
							내 프로필
							<AccountCircleIcon />
						</H.ALink>
						<H.ALink to='/' onClick={logout}>
							로그아웃
							<LogoutIcon />
						</H.ALink>
					</H.Container>
				)}
			</H.Header>
		</>
	);
}
