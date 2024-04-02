import { useAuthContext } from '../../Context/useAuthContext';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { appAuth, storage } from '../../Firebase/config';
import { updateProfile } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import persImg from '../../Assets/No-img.svg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ImgPreview } from '../../Hook/useImgPreview';
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import useDebounce from '../../Hook/useDebounce';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ToastPopup from '../../Components/Toast/Toast';
import { Box, InputBase, Typography } from '@mui/material';
import { Modal } from '../../Components/Modal/Modal';
import { M } from '../../Components/Modal/modal.style';
import { useWithdrawal } from '../../Hook/FirebaseHook/userWithdrawal';
import { Label } from '../../Styles/Common';
import { Helmet } from 'react-helmet-async';

export default function ProfileEdit() {
	const { user } = useAuthContext();
	const location = useLocation();
	const [displayName, setDisplayName] = useState(user?.displayName || '');
	const [userIntro, setUserIntro] = useState(location.state.intro || '');
	const navigate = useNavigate();
	const { imageSrc, imgUrl, imgFilter, setImgFilter, onUpload } = ImgPreview();
	const [validName, setValidName] = useState('');
	const debounceName = useDebounce<string>(displayName);
	const userRef = collection(appFirestore, 'user');
	const queryClient = useQueryClient();
	const [toast, setToast] = useState(false);
	const { withDrawal } = useWithdrawal();
	const [isOpenModal, setIsOpenModal] = useState(false);

	const validCheck = async () => {
		const Query = query(userRef, where('displayName', '==', displayName));
		const querySnapshot = await getDocs(Query);
		if (
			!(user && user.displayName === displayName) &&
			querySnapshot.docs.length > 0
		) {
			setValidName('중복된 닉네임입니다.');
		} else if (displayName.length === 0) {
			setValidName('닉네임을 입력해주세요.');
		} else {
			setValidName('');
		}
	};

	useEffect(() => {
		validCheck();
	}, [debounceName]);

	const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'nickNameEdit') {
			setDisplayName(e.target.value);
		} else if (e.target.id === 'introEdit') {
			setUserIntro(e.target.value);
		}
	};

	const profileEdit = async () => {
		if (appAuth.currentUser && user) {
			const colRef = collection(appFirestore, 'user');
			const docRef = doc(colRef, user.uid);
			if (imgUrl) {
				const storageRef = ref(storage, `profile/${user.uid}`);
				const snapshot = await uploadBytes(storageRef, imgUrl);
				const downUrl = await getDownloadURL(snapshot.ref);

				await updateProfile(appAuth.currentUser, {
					displayName: displayName,
					photoURL: downUrl || '',
				});
				await updateDoc(docRef, {
					displayName: displayName,
					intro: userIntro,
					photoURL: downUrl || '',
				});
			} else {
				await updateProfile(appAuth.currentUser, {
					displayName: displayName,
				});

				const docRef = doc(colRef, user.uid);
				await updateDoc(docRef, {
					displayName: displayName,
					intro: userIntro,
				});
			}
			setToast(true);
		}
	};

	const mutation = useMutation({
		mutationFn: profileEdit,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
		onError: () => {
			console.log('Error');
		},
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		mutation.mutate();
	};

	const handleWithDrawal = () => {
		setIsOpenModal(true);
	};

	return (
		<>
			<Helmet>
				<title>프로필 수정 - TreeBook</title>
			</Helmet>
			<Box
				component='main'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					borderLeft: '1px solid #ccc',
					borderRight: '1px solid #ccc',
					marginTop: '20px',
					padding: '20px 24px',
					gap: '15px',
				}}
			>
				<Typography component='h1' fontSize='1.5em' fontWeight='bold'>
					프로필 수정
				</Typography>
				<Typography component='p' fontSize='1em'>
					프로필을 수정 하실 수 있습니다
				</Typography>
				<Box
					component='form'
					sx={{
						width: '100%',
						borderLeft: '1px solid #ccc',
						paddingLeft: '20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
					onSubmit={handleSubmit}
				>
					<Box
						sx={{
							width: '110px',
							height: '110px',
							marginBottom: '10px',
							display: 'flex',
							position: 'relative',
							border: '1px solid #ccc',
							borderRadius: '50%',
							cursor: 'pointer',
						}}
					>
						<img
							style={{
								width: '100%',
								borderRadius: '50%',
								objectFit: 'cover',
								flexShrink: 0,
							}}
							src={(imgUrl && imageSrc) || (user && user.photoURL) || persImg}
							alt={'프로필 이미지 사진입니다.'}
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
						<Label htmlFor='profileImgEdit'>프로필 이미지 수정</Label>
						<input
							style={{
								width: '100%',
								height: '100%',
								position: 'absolute',
								opacity: 0,
								zIndex: 1,
								cursor: 'pointer',
							}}
							id='profileImgEdit'
							type='file'
							accept='image/*'
							onChange={(e) => onUpload(e)}
						/>
					</Box>
					<Typography
						component='label'
						color='text.secondary'
						fontWeight='bold'
						htmlFor='nickNameEdit'
					>
						닉네임
					</Typography>
					<InputBase
						sx={{
							width: '50%',
							height: '30px',
							padding: '5px 0',
							border: 'none',
							borderBottom: '1px solid #ccc',
							backgroundColor: 'inherit',
						}}
						id='nickNameEdit'
						type='text'
						placeholder='변경할 닉네임을 입력해주세요.'
						value={displayName}
						onChange={handleEdit}
					/>
					<Typography
						component='p'
						fontSize='0.7em'
						color='red'
						sx={{ height: '30px', padding: '8px 0' }}
					>
						{validName || '\u00A0'}
					</Typography>
					<Typography
						component='label'
						color='text.secondary'
						fontWeight='bold'
						htmlFor='introEdit'
					>
						자기소개
					</Typography>
					<InputBase
						sx={{
							width: '50%',
							height: '30px',
							padding: '5px 0',
							border: 'none',
							borderBottom: '1px solid #ccc',
							backgroundColor: 'inherit',
						}}
						id='introEdit'
						type='text'
						placeholder='자신에 대해서 소개해주세요.'
						value={userIntro}
						onChange={handleEdit}
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingTop: '10px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								gap: '20px',
							}}
						>
							<Box
								component='button'
								sx={{
									width: '50px',
									height: '30px',
									fontSize: '1em',
									fontWeight: 'bold',
									border: 'none',
									borderRadius: '4px',
									color: 'text.primary',
									cursor: 'pointer',
									backgroundColor: 'background.book',
									'&:hover': {
										backgroundColor:
											validName !== '' ? 'background.book' : 'background.hover',
									},
								}}
								type='submit'
								disabled={validName !== '' ? true : false}
								style={{
									backgroundColor:
										validName !== '' ? 'background.book' : 'background.hover',
									cursor: validName !== '' ? 'default' : 'pointer',
								}}
							>
								저장
							</Box>

							<Box
								component='button'
								sx={{
									width: '50px',
									height: '30px',
									fontSize: '1em',
									fontWeight: 'bold',
									border: 'none',
									borderRadius: '4px',
									color: 'text.primary',
									cursor: 'pointer',
									backgroundColor: 'background.book',
									'&:hover': {
										backgroundColor:
											validName !== '' ? 'background.book' : 'background.hover',
									},
								}}
								onClick={() => navigate(-1)}
							>
								취소
							</Box>
						</Box>
						<Box
							component='button'
							sx={{
								width: '100px',
								height: '30px',
								fontSize: '1em',
								fontWeight: 'bold',
								border: 'none',
								borderRadius: '4px',
								color: 'text.primary',
								cursor: 'pointer',
								backgroundColor: 'background.book',
								'&:hover': {
									backgroundColor: 'background.hover',
									color: 'red',
								},
							}}
							type='button'
							onClick={() => handleWithDrawal()}
						>
							계정 삭제
						</Box>
					</Box>
				</Box>

				{toast && (
					<ToastPopup
						setToast={setToast}
						message={'프로필이 변경되었습니다!'}
						position={'top'}
						page={['profile', displayName]}
					/>
				)}
				{imgFilter && (
					<ToastPopup
						setToast={setImgFilter}
						message={'이미지 파일만 프로필로 설정할 수 있습니다.'}
						position={'top'}
					/>
				)}
			</Box>

			{isOpenModal && (
				<Modal
					setIsOpenModal={setIsOpenModal}
					isOpen={isOpenModal}
					promise={withDrawal}
				>
					<M.H2>정말로 계정을 삭제하시겠습니까?</M.H2>
					<M.P>계정을 삭제하면 복구할 수 없습니다.</M.P>
					<M.P>(등록한 댓글 및 좋아요 기록은 자동으로 삭제되지 않습니다.)</M.P>
				</Modal>
			)}
		</>
	);
}
