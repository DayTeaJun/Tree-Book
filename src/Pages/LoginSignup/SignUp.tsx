import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormEvent, useState } from 'react';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';
import { ImgPreview } from '../../Hook/useImgPreview';
import { InputValueType } from '../../Types/userType';
import { Link } from 'react-router-dom';
import { LS } from './LoginSignup.style';
import ValidInput from '../../Components/ValidInput/ValidInput';

export default function SignUp() {
	const { error, isPending, signup } = useSignup();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();
	const [inputValue, setInputValue] = useState<InputValueType>({
		email: '',
		password: '',
		displayName: '',
		intro: '',
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (imgUrl) {
			signup({ ...inputValue, imgUrl });
		} else {
			signup(inputValue);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
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
					회원가입
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container alignItems={'center'} spacing={2}>
						<Grid item xs={12} sm={5}>
							<LS.Container>
								<LS.Img
									src={
										(imgUrl && imageSrc) ||
										'https://firebasestorage.googleapis.com/v0/b/treebook-95cdf.appspot.com/o/profile%2FTemporary%20Profile%2Ftem_img.png?alt=media&token=b3a0020f-adc2-4272-aef5-5c2441d3191b'
									}
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
						</Grid>
						<ValidInput setInputValue={setInputValue} />
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='success'
						sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
					>
						회원가입
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link to='/login'>{'이메일로 로그인'}</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
