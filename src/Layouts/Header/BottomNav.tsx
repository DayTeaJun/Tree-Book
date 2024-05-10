import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthContext } from '../../Context/useAuthContext';
import { useLogout } from '../../Hook/FirebaseHook/useLogout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const BottomNav = () => {
	const { isAuthReady, user } = useAuthContext();
	const { error, isPending, logout } = useLogout();

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
			}}
		>
			<Link to='/' style={{ textAlign: 'center', cursor: 'pointer' }}>
				<HomeIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
				<Typography
					component='p'
					fontSize='1em'
					fontWeight='bold'
					color='text.secondary'
				>
					홈
				</Typography>
			</Link>
			<Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
				<SearchIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
				<Typography
					component='p'
					fontSize='1em'
					fontWeight='bold'
					color='text.secondary'
				>
					검색
				</Typography>
			</Box>
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
					>
						내 프로필
					</Typography>
				</Link>
			)}

			{isAuthReady && user ? (
				<Link
					to='/'
					onClick={logout}
					style={{ textAlign: 'center', cursor: 'pointer' }}
				>
					<LogoutIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
					<Typography
						component='p'
						fontSize='1em'
						fontWeight='bold'
						color='text.secondary'
					>
						로그아웃
					</Typography>
				</Link>
			) : (
				<Link to='/login' style={{ textAlign: 'center', cursor: 'pointer' }}>
					<LoginIcon fontSize='medium' sx={{ color: 'text.secondary' }} />
					<Typography
						component='p'
						fontSize='1em'
						fontWeight='bold'
						color='text.secondary'
					>
						로그인
					</Typography>
				</Link>
			)}
		</Box>
	);
};
