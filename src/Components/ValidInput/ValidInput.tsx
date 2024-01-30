import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { InputValueType } from '../../Types/userType';
import { collection, getDocs, query, where } from 'firebase/firestore';
import useDebounce from '../../Hook/useDebounce';
import { appFirestore } from '../../Firebase/config';
import { Box, Typography } from '@mui/material';

interface ValidInputProps {
	setInputValue: Dispatch<SetStateAction<InputValueType>>;
}

export default function ValidInput({ setInputValue }: ValidInputProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [intro, setIntro] = useState('');
	const [validEmail, setValidEmail] = useState(' ');
	const [validName, setValidName] = useState(' ');
	const userRef = collection(appFirestore, 'user');
	const debounceEmail = useDebounce<string>(email);
	const debounceName = useDebounce<string>(displayName);

	const handleData = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'email') {
			setEmail(e.target.value);
			setInputValue((prev) => ({ ...prev, email: e.target.value }));
		} else if (e.target.id === 'password') {
			setPassword(e.target.value);
			setInputValue((prev) => ({ ...prev, password: e.target.value }));
		} else if (e.target.id === 'nickname') {
			setDisplayName(e.target.value);
			setInputValue((prev) => ({ ...prev, displayName: e.target.value }));
		} else if (e.target.id === 'intro') {
			setIntro(e.target.value);
			setInputValue((prev) => ({ ...prev, intro: e.target.value }));
		}
	};

	const validCheck = async (validCheck: string) => {
		const Query = query(
			userRef,
			where(`${validCheck}`, '==', validCheck === 'email' ? email : displayName)
		);
		const querySnapshot = await getDocs(Query);
		if (querySnapshot.docs.length > 0) {
			if (validCheck === 'email') {
				setValidEmail('중복된 이메일입니다.');
			} else {
				setValidName('중복된 닉네임입니다.');
			}
		} else {
			if (validCheck === 'email') {
				setValidEmail('');
			} else {
				setValidName('');
			}
		}
	};

	useEffect(() => {
		validCheck('email');
		validCheck('displayName');
	}, [debounceEmail, debounceName]);

	return (
		<>
			<Grid item xs={12} sm={7}>
				<TextField
					required
					fullWidth
					id='nickname'
					label='Nickname'
					name='Nickname'
					onChange={handleData}
				/>
				<Typography
					component='p'
					fontSize={'0.7em'}
					sx={{ mt: 1, color: 'red', minHeight: '2em' }}
				>
					{validName}
				</Typography>
			</Grid>

			<Grid item xs={12} sx={{ mt: 2 }}>
				<TextField
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					onChange={handleData}
				/>
				<Typography
					component='p'
					fontSize={'0.7em'}
					sx={{ mt: 1, color: 'red', minHeight: '2em' }}
				>
					{validEmail}
				</Typography>
			</Grid>

			<Grid item xs={12} sx={{ mb: 3 }}>
				<TextField
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					onChange={handleData}
				/>
			</Grid>

			<Grid item xs={12}>
				<TextField
					required
					fullWidth
					name='intro'
					label='intro'
					id='intro'
					onChange={handleData}
				/>
			</Grid>
		</>
	);
}
