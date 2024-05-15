import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthContext } from '../../Context/useAuthContext';
import { useLogout } from '../../Hook/FirebaseHook/useLogout';
import { Link } from 'react-router-dom';

export const BottomNav = () => {
	const { isAuthReady, user } = useAuthContext();

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				position: 'sticky',
				bottom: '0',
				backgroundColor: 'background.default',
				padding: '10px 0',
				borderTop: '1px solid',
				borderColor: 'text.secondary',
				zIndex: 99,
			}}
		>
			<Link to='/' style={{ textAlign: 'center', cursor: 'pointer' }}>
				<HomeIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
				<Typography
					component='p'
					fontSize='1em'
					fontWeight='bold'
					color='text.secondary'
					sx={{
						transition: '0.4s',
						'&:hover': {
							color: 'text.hover',
						},
					}}
				>
					홈
				</Typography>
			</Link>
			<Link
				to={`/search/ /1`}
				style={{ textAlign: 'center', cursor: 'pointer' }}
			>
				<SearchIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
				<Typography
					component='p'
					fontSize='1em'
					fontWeight='bold'
					color='text.secondary'
					sx={{
						transition: '0.4s',
						'&:hover': {
							color: 'text.hover',
						},
					}}
				>
					검색
				</Typography>
			</Link>
			{isAuthReady && user && (
				<Link
					to={`/profile/${user.displayName}`}
					style={{ textAlign: 'center', cursor: 'pointer' }}
				>
					<AccountCircleIcon
						fontSize='medium'
						sx={{ color: 'text.secondary' }}
					/>
					<Typography
						component='p'
						fontSize='1em'
						fontWeight='bold'
						color='text.secondary'
						sx={{
							transition: '0.4s',
							'&:hover': {
								color: 'text.hover',
							},
						}}
					>
						내 프로필
					</Typography>
				</Link>
			)}

			{isAuthReady && !user && (
				<Link to='/login' style={{ textAlign: 'center', cursor: 'pointer' }}>
					<LoginIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
					<Typography
						component='p'
						fontSize='1em'
						fontWeight='bold'
						color='text.secondary'
						sx={{
							transition: '0.4s',
							'&:hover': {
								color: 'text.hover',
							},
						}}
					>
						로그인
					</Typography>
				</Link>
			)}
		</Box>
	);
};
