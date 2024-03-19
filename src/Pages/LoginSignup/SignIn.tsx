import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useLogin } from '../../Hook/FirebaseHook/useLogin';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { error, isPending, login } = useLogin();

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'email') {
			setEmail(e.target.value);
		} else if (e.target.id === 'password') {
			setPassword(e.target.value);
		}
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<Container component='main' maxWidth='xs' sx={{}}>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component='h1' variant='h5' fontWeight={'bold'}>
					로그인
				</Typography>
				<Box component='form' onSubmit={handleSubmit}>
					<TextField
						margin='normal'
						fullWidth
						id='email'
						label='이메일'
						name='email'
						autoFocus
						onChange={handleData}
					/>
					<TextField
						margin='normal'
						fullWidth
						name='password'
						label='비밀번호'
						type='password'
						id='password'
						onChange={handleData}
					/>
					<Typography
						component='p'
						fontSize={'0.7em'}
						sx={{
							color: 'red',
							minHeight: '1.5em',
						}}
					>
						{error && '등록되지 않은 계정입니다.'}
					</Typography>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						sx={{ mt: 1.5, mb: 2, fontWeight: 'bold' }}
					>
						로그인
					</Button>

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Link to='/signup'>{'이메일로 회원가입'}</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
