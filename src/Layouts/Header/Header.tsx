import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/useAuthContext';
import { useLogout } from '../../Hook/FirebaseHook/useLogout';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PortraitIcon from '@mui/icons-material/Portrait';
import SearchIcon from '@mui/icons-material/Search';
import DarkToggle from './DarkToggle';
import { Box, Grid, IconButton, Input, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Label } from '../../Styles/Common';

export default function Header() {
	const [search, setSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { isAuthReady, user } = useAuthContext();
	const { error, isPending, logout } = useLogout();

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (!inputRef.current) return;
		setSearch(inputRef.current.value);
	};

	useEffect(() => {
		if (search !== '') {
			navigate(`/search/${search}/1`);
			setSearch('');
		}
	}, [search]);

	return (
		<>
			<Box
				component='header'
				sx={{
					position: 'sticky',
					top: '0',
					width: '100vw',
					backgroundColor: 'background.nav',
					padding: '0.5em',
				}}
			>
				<Grid container>
					<Grid xs={0} md={3} lg={2} />
					<Grid xs={12} md={6} lg={8}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Link to='/'>
								<Typography
									fontSize='2em'
									fontWeight='bold'
									color='green'
									fontFamily='OG_Renaissance_Secret-Rg'
								>
									Tree Book
								</Typography>
							</Link>
							<Box
								component='form'
								sx={{
									display: 'flex',
									justifyContent: 'center',
									'&:focus-within': {
										backgroundColor: 'background.searchFocus',
									},
									padding: '0.5em',
									backgroundColor: 'background.search',
								}}
								onSubmit={handleSubmit}
							>
								<Label htmlFor='searchTtitle'>도서 검색창</Label>

								<Input
									id='searchTtitle'
									type='text'
									ref={inputRef}
									placeholder='책 이름을 입력해주세요.'
									inputProps={{
										style: {
											textAlign: 'center',
											color: 'text.primary',
											fontWeight: 'bold',
										},
									}}
								/>
								<IconButton type='submit' aria-label='searchButton'>
									<SearchIcon />
								</IconButton>
							</Box>
							<Box sx={{ display: 'flex' }}>
								<DarkToggle />
								<Box
									sx={{
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										backgroundColor: 'background.nav',
										gap: '0.5em',
										padding: '0.5em',
									}}
								>
									{isAuthReady && !user && (
										<>
											<Link to='/signup'>
												<Typography
													fontSize='1em'
													fontWeight='bold'
													color='text.primary'
													sx={{
														display: 'flex',
														alignItems: 'center',
														gap: '0.2em',
														padding: '0.5em',
														borderRadius: '0.2em',
														transition: '0.4s',
														'&:hover': {
															backgroundColor: 'background.searchFocus',
														},
													}}
												>
													회원가입
													<PortraitIcon />
												</Typography>
											</Link>
											<Link to='/login'>
												<Typography
													fontSize='1em'
													fontWeight='bold'
													color='text.primary'
													sx={{
														display: 'flex',
														alignItems: 'center',
														gap: '0.2em',
														padding: '0.5em',
														borderRadius: '0.2em',
														transition: '0.4s',
														'&:hover': {
															backgroundColor: 'background.searchFocus',
														},
													}}
												>
													로그인
													<LoginIcon />
												</Typography>
											</Link>
										</>
									)}
									{isAuthReady && user && (
										<>
											<Link to={`/profile/${user.displayName}`}>
												<Typography
													fontSize='1em'
													fontWeight='bold'
													color='text.primary'
													sx={{
														display: 'flex',
														alignItems: 'center',
														gap: '0.2em',
														padding: '0.5em',
														borderRadius: '0.2em',
														transition: '0.4s',
														'&:hover': {
															backgroundColor: 'background.searchFocus',
														},
													}}
												>
													내 프로필
													<AccountCircleIcon />
												</Typography>
											</Link>
											<Link to='/' onClick={logout}>
												<Typography
													fontSize='1em'
													fontWeight='bold'
													color='text.primary'
													sx={{
														display: 'flex',
														alignItems: 'center',
														gap: '0.2em',
														padding: '0.5em',
														borderRadius: '0.2em',
														transition: '0.4s',
														'&:hover': {
															backgroundColor: 'background.searchFocus',
														},
													}}
												>
													로그아웃
													<LogoutIcon />
												</Typography>
											</Link>
										</>
									)}
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid xs={0} md={3} lg={2} />
				</Grid>
			</Box>
		</>
	);
}
