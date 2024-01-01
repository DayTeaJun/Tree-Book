import { ChangeEvent, FormEventHandler, useState } from 'react';
import { SignupForm } from './LoginSignup.style';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'email') {
			setEmail(e.target.value);
		} else if (e.target.type === 'password') {
			setPassword(e.target.value);
		}
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<SignupForm onSubmit={handleSubmit}>
			<fieldset>
				<legend>로그인</legend>
				<label htmlFor='myEmail'>Email</label>
				<input
					type='email'
					id='myEmail'
					required
					value={email}
					onChange={handleData}
				/>

				<label htmlFor='myPassword'>Password</label>
				<input
					type='password'
					id='myPassword'
					required
					value={password}
					onChange={handleData}
				/>

				<button type='submit'>로그인</button>
			</fieldset>
		</SignupForm>
	);
}
