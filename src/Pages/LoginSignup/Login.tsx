import { ChangeEvent, FormEventHandler, useState } from 'react';
import { LS } from './LoginSignup.style';
import { useLogin } from '../../Hook/FirebaseHook/useLogin';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { error, isPending, login } = useLogin();

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'email') {
			setEmail(e.target.value);
		} else if (e.target.type === 'password') {
			setPassword(e.target.value);
		}
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<LS.Form onSubmit={handleSubmit}>
			<fieldset>
				<LS.Legend>로그인</LS.Legend>
				<LS.Label htmlFor='myEmail'>Email</LS.Label>
				<LS.Input
					type='email'
					id='myEmail'
					required
					value={email}
					onChange={handleData}
				/>

				<LS.Label htmlFor='myPassword'>Password</LS.Label>
				<LS.Input
					type='password'
					id='myPassword'
					required
					value={password}
					onChange={handleData}
				/>

				<LS.Button type='submit'>로그인</LS.Button>
			</fieldset>
		</LS.Form>
	);
}
