import { FormEventHandler, useState } from 'react';
import { LS } from './LoginSignup.style';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';
import persImg from '../../Assets/No-img.svg';
import { ImgPreview } from '../../Hook/useImgPreview';
import ValidInput from '../../Components/ValidInput/ValidInput';
import { InputValueType } from '../../Types/userType';

export default function Signup() {
	const { error, isPending, signup } = useSignup();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();
	const [inputValue, setInputValue] = useState<InputValueType>({
		email: '',
		password: '',
		displayName: '',
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (imgUrl) {
			signup({ ...inputValue, imgUrl });
		} else {
			signup(inputValue);
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
				<ValidInput setInputValue={setInputValue} />
				<LS.Button type='submit'>회원가입</LS.Button>
			</fieldset>
		</LS.Form>
	);
}
