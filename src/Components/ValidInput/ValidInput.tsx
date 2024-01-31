import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { InputValueType } from '../../Types/userType';
import { collection, getDocs, query, where } from 'firebase/firestore';
import useDebounce from '../../Hook/useDebounce';
import { appFirestore } from '../../Firebase/config';
import { Typography } from '@mui/material';

interface ValidInputProps {
	setInputValue: Dispatch<SetStateAction<InputValueType>>;
	setIsDisabled: Dispatch<SetStateAction<boolean>>;
}

export default function ValidInput({
	setInputValue,
	setIsDisabled,
}: ValidInputProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [intro, setIntro] = useState('');
	const [validEmail, setValidEmail] = useState(' ');
	const [validName, setValidName] = useState(' ');
	const userRef = collection(appFirestore, 'user');
	const debounceEmail = useDebounce<string>(email);
	const debounceName = useDebounce<string>(displayName);

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
		if (validCheck === 'email' && !emailRegex.test(email)) {
			return setValidEmail('잘못된 이메일 형식입니다.');
		}
		const Query = query(
			userRef,
			where(
				`${validCheck}`,
				'==',
				validCheck === 'email' ? debounceEmail : debounceName
			)
		);
		const querySnapshot = await getDocs(Query);
		if (querySnapshot.docs.length > 0) {
			if (validCheck === 'email') {
				setValidEmail('중복된 이메일입니다.');
			} else if (validCheck === 'displayName') {
				setValidName('중복된 닉네임입니다.');
			}
		} else {
			if (validCheck === 'email') {
				setValidEmail('사용 가능한 이메일입니다.');
			} else if (validCheck === 'displayName') {
				setValidName('사용 가능한 닉네임입니다.');
			}
		}
	};

	useEffect(() => {
		if (email.length > 0) {
			validCheck('email');
		} else {
			setValidEmail('');
		}
		if (displayName.length > 0) {
			validCheck('displayName');
		} else {
			setValidName('');
		}
	}, [debounceEmail, debounceName]);

	useEffect(() => {
		if (
			validName === '사용 가능한 닉네임입니다.' &&
			validEmail === '사용 가능한 이메일입니다.' &&
			password.length > 5
		) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [validEmail, validName, password]);

	return (
		<>
			<Grid item xs={12}>
				<TextField
					fullWidth
					autoFocus
					id='email'
					label='이메일 주소를 입력해주세요.'
					name='email'
					error={
						validEmail === '잘못된 이메일 형식입니다.' ||
						validEmail === '중복된 이메일입니다.'
					}
					onChange={handleData}
				/>
				<Typography
					component='p'
					fontSize={'0.7em'}
					sx={{
						color: `${
							validEmail === '사용 가능한 이메일입니다.' ? 'green' : 'red'
						}`,
						minHeight: '1.5em',
						mt: 0.5,
					}}
				>
					{validEmail}
				</Typography>
			</Grid>

			<Grid item xs={12} sx={{ mb: 2 }}>
				<TextField
					fullWidth
					name='password'
					label='비밀번호를 설정해주세요.'
					type='password'
					id='password'
					onChange={handleData}
				/>
			</Grid>

			<Grid item xs={12}>
				<TextField
					fullWidth
					id='nickname'
					label='사용자 이름을 설정해주세요.'
					name='Nickname'
					error={validName === '중복된 닉네임입니다.'}
					onChange={handleData}
				/>
				<Typography
					component='p'
					fontSize={'0.7em'}
					sx={{
						color: `${
							validName === '사용 가능한 닉네임입니다.' ? 'green' : 'red'
						}`,
						minHeight: '1.5em',
						mt: 0.5,
					}}
				>
					{validName}
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<TextField
					fullWidth
					name='intro'
					label='자신에 대해 소개해주세요.'
					id='intro'
					onChange={handleData}
				/>
			</Grid>
		</>
	);
}
