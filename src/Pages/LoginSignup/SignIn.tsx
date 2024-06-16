import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useLogin } from '../../Hook/FirebaseHook/useLogin';
import { Helmet } from 'react-helmet-async';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { error, login } = useLogin();

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
		<Container component='main' maxWidth='lg'>
			<Helmet>
				<title>로그인 - TreeBook</title>
			</Helmet>
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
						autoComplete='off'
						onChange={handleData}
					/>
					<Typography
						component='p'
						fontSize={'0.8em'}
						sx={{
							color: 'red',
							minHeight: '1.5em',
						}}
					>
						{error &&
							'이메일 또는 비밀번호가 잘못 입력되었거나, 등록되지 않은 계정입니다.'}
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
						<Link to='/signup'>
							<Typography fontSize='1em' fontWeight='bold' color='text.primary'>
								이메일로 회원가입
							</Typography>
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
