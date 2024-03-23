import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormEvent, useState } from 'react';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';
import { ImgPreview } from '../../Hook/useImgPreview';
import { InputValueType } from '../../Types/userType';
import { Link } from 'react-router-dom';
import ValidInput from '../../Components/ValidInput/ValidInput';
import temImg from '../../Assets/profile-img.png';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ToastPopup from '../../Components/Toast/Toast';
import { Label } from '../../Styles/Common';
import { Box, Grid, Input } from '@mui/material';

export default function SignUp() {
	const { error, isPending, signup } = useSignup();
	const { imageSrc, imgUrl, imgFilter, setImgFilter, onUpload } = ImgPreview();
	const [inputValue, setInputValue] = useState<InputValueType>({
		email: '',
		password: '',
		displayName: '',
		intro: '',
	});
	const [isDisabled, setIsDisabled] = useState(true);

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
						<Grid item xs={12}>
							<Box
								sx={{
									width: '100px',
									height: '100px',
									margin: '0 auto',
									position: 'relative',
									border: '1px solid #ccc',
									borderRadius: '50%',
								}}
							>
								<img
									style={{
										width: '100%',
										objectFit: 'cover',
										flexShrink: 0,
										borderRadius: '50%',
									}}
									src={(imgUrl && imageSrc) || temImg}
									alt={'프로필 이미지 등록'}
								/>
								<ImageSearchIcon
									sx={{
										position: 'absolute',
										right: '0',
										bottom: '0',
										padding: '5px 2px 5px 5px',
										borderRadius: '50%',
										backgroundColor: 'green',
										color: '#fff',
									}}
									fontSize='large'
								/>
								<Label htmlFor='profileImg'>프로필 이미지</Label>
								<input
									style={{
										width: '100%',
										height: '100%',
										position: 'absolute',
										top: '0',
										left: '0',
										opacity: 0,
										zIndex: 999,
										cursor: 'pointer',
									}}
									id='profileImg'
									type='file'
									accept='image/*'
									onChange={(e) => onUpload(e)}
								/>
							</Box>
						</Grid>
						<ValidInput
							setInputValue={setInputValue}
							setIsDisabled={setIsDisabled}
						/>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='success'
						disabled={isDisabled}
						sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}
					>
						회원가입
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link to='/login'>{'이메일로 로그인'}</Link>
						</Grid>
					</Grid>
				</Box>
				{imgFilter && (
					<ToastPopup
						setToast={setImgFilter}
						message={'이미지 파일만 프로필로 설정할 수 있습니다.'}
						position={'top'}
					/>
				)}
			</Box>
		</Container>
	);
}
