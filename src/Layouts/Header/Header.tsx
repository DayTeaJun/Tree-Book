import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

export default function Header() {
	const [search, setSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { user, isAuthReady } = useSelector((state: RootState) => state.user);
	const { logout } = useLogout();
	const { isDownMD } = useMediaQueries();

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
	}, [search, navigate]);

	return (
		<>
			<Box
				component='header'
				sx={{
					position: 'sticky',
					top: '0',
					width: '100%',
					padding: '0.5em',
					zIndex: 999,
					backgroundColor: 'background.default',
				}}
			>
				<Grid container>
					<Grid item xs={0} md={1} lg={2} />
					<Grid item xs={12} md={10} lg={8}>
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
							{!isDownMD && (
								<Box
									component='form'
									sx={{
										display: 'flex',
										justifyContent: 'center',
										'&:focus-within': {
											backgroundColor: 'background.searchFocus',
										},
										padding: '0.5em',
									}}
									onSubmit={handleSubmit}
								>
									<Label htmlFor='searchTtitle'>도서 검색창</Label>

									<Input
										id='searchTtitle'
										type='text'
										inputRef={inputRef}
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
							)}
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
								<DarkToggle />
								{isDownMD && user && (
									<Link to='/' onClick={logout}>
										<Typography
											fontSize='1em'
											fontWeight='bold'
											color='text.primary'
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '0.2em',
												padding: '10px',
												borderRadius: '0.2em',
												transition: '0.4s',
												'&:hover': {
													color: 'text.hover',
												},
											}}
										>
											<LogoutIcon />
										</Typography>
									</Link>
								)}
								{!isDownMD && (
									<Box
										sx={{
											height: '100%',
											display: 'flex',
											justifyContent: 'center',
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
															borderRadius: '10px',
															transition: '0.4s',
															'&:hover': {
																color: 'text.hover',
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
															padding: '10px',
															borderRadius: '0.2em',
															transition: '0.4s',
															'&:hover': {
																color: 'text.hover',
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
															borderRadius: '10px',
															transition: '0.4s',
															'&:hover': {
																color: 'text.hover',
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
															padding: '10px',
															borderRadius: '0.2em',
															transition: '0.4s',
															'&:hover': {
																color: 'text.hover',
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
								)}
							</Box>
						</Box>
					</Grid>
					<Grid item xs={0} md={1} lg={2} />
				</Grid>
			</Box>
		</>
	);
}
