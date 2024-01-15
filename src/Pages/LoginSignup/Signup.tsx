import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';
import { LS } from './LoginSignup.style';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';
import persImg from '../../Assets/No-img.svg';
import { ImgPreview } from '../../Hook/useImgPreview';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const { error, isPending, signup } = useSignup();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'email') {
			setEmail(e.target.value);
		} else if (e.target.type === 'password') {
			setPassword(e.target.value);
		} else if (e.target.type === 'text') {
			setDisplayName(e.target.value);
		}
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (imgUrl) {
			signup({ email, password, displayName, imgUrl });
		} else {
			alert('프로필 이미지를 등록해주세요!');
		}
	};

	return (
		<LS.Form onSubmit={handleSubmit}>
			<fieldset>
				<LS.Legend>회원가입</LS.Legend>
				<LS.Container>
					<LS.Img src={(imgUrl && imageSrc) || persImg} />
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

				<LS.Button type='submit'>회원가입</LS.Button>
			</fieldset>
		</LS.Form>
	);
}
