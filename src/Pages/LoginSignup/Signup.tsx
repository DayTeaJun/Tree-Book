import {
	ChangeEvent,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react';
import { LS } from './LoginSignup.style';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';
import persImg from '../../Assets/No-img.svg';
import { ImgPreview } from '../../Hook/useImgPreview';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import useDebounce from '../../Hook/useDebounce';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [validEmail, setValidEmail] = useState(' ');
	const [validName, setValidName] = useState(' ');
	const { error, isPending, signup } = useSignup();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();
	const userRef = collection(appFirestore, 'user');
	const debounceEmail = useDebounce<string>(email);
	const debounceName = useDebounce<string>(displayName);

	const handleData = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'email') {
			setEmail(e.target.value);
		} else if (e.target.type === 'password') {
			setPassword(e.target.value);
		} else if (e.target.type === 'text') {
			setDisplayName(e.target.value);
		}
	};

	const emailValid = async () => {
		const Query = query(userRef, where('email', '==', email));
		const querySnapshot = await getDocs(Query);
		if (querySnapshot.docs.length > 0) {
			setValidEmail('중복된 이메일입니다.');
		} else {
			setValidEmail('');
		}
	};

	const nameValid = async () => {
		const Query = query(userRef, where('displayName', '==', displayName));
		const querySnapshot = await getDocs(Query);
		if (querySnapshot.docs.length > 0) {
			setValidName('중복된 닉네임입니다.');
		} else {
			setValidName('');
		}
	};

	useEffect(() => {
		emailValid();
		nameValid();
	}, [debounceEmail, debounceName]);

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (imgUrl) {
			signup({ email, password, displayName, imgUrl });
		} else {
			signup({ email, password, displayName });
		}
	};

	return (
		<LS.Form onSubmit={handleSubmit}>
			<fieldset>
				<LS.Legend>회원가입</LS.Legend>
				<LS.Container>
					<LS.Img
						src={(imgUrl && imageSrc) || persImg}
						alt={'프로필 이미지 등록'}
					/>
					<LS.ImgLabel htmlFor='profileImg'>프로필 이미지</LS.ImgLabel>
					<LS.ImgInput
						id='profileImg'
						type='file'
						accept='image/*'
						onChange={(e) => onUpload(e)}
					/>
				</LS.Container>
				<LS.Label htmlFor='myEmail'>Email</LS.Label>
				<LS.Input
					type='email'
					id='myEmail'
					required
					value={email}
					onChange={handleData}
				/>
				<p>{validEmail}</p>
				<LS.Label htmlFor='myPassword'>Password</LS.Label>
				<LS.Input
					type='password'
					id='myPassword'
					required
					value={password}
					onChange={handleData}
				/>

				<LS.Label htmlFor='myNickName'>Nickname</LS.Label>
				<LS.Input
					type='text'
					id='myNickName'
					required
					value={displayName}
					onChange={handleData}
				/>
				<p>{validName}</p>
				<LS.Button type='submit'>회원가입</LS.Button>
			</fieldset>
		</LS.Form>
	);
}
