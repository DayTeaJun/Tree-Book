import { useAuthContext } from '../../Context/useAuthContext';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { appAuth, storage } from '../../Firebase/config';
import { updateProfile } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { PE } from './ProfileEdit.style';
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
import { Box } from '@mui/material';
import { Modal } from '../../Components/Modal/Modal';
import { M } from '../../Components/Modal/modal.style';
import { useWithdrawal } from '../../Hook/FirebaseHook/userWithdrawal';

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
			<PE.Main>
				<PE.H1>프로필 수정</PE.H1>
				<PE.P>프로필을 수정 하실 수 있습니다</PE.P>
				<PE.Form onSubmit={handleSubmit}>
					<PE.ContainerImg>
						<PE.Img
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
						<PE.ImgLabel htmlFor='profileImgEdit'>
							프로필 이미지 수정
						</PE.ImgLabel>
						<PE.ImgInput
							id='profileImgEdit'
							type='file'
							accept='image/*'
							onChange={(e) => onUpload(e)}
						/>
					</PE.ContainerImg>
					<PE.Label htmlFor='nickNameEdit'>닉네임</PE.Label>
					<PE.Input
						id='nickNameEdit'
						type='text'
						placeholder='변경할 닉네임을 입력해주세요.'
						value={displayName}
						onChange={handleEdit}
					/>
					<PE.PValid>{validName || '\u00A0'}</PE.PValid>
					<PE.Label htmlFor='introEdit'>자기소개</PE.Label>
					<PE.Input
						id='introEdit'
						type='text'
						placeholder='자신에 대해서 소개해주세요.'
						value={userIntro}
						onChange={handleEdit}
					/>

					<PE.ContainerBtn>
						<PE.Button
							type='submit'
							disabled={validName !== '' ? true : false}
							style={{
								backgroundColor: validName !== '' ? '#eee' : 'green',
							}}
						>
							저장
						</PE.Button>

						<PE.Button type='button' onClick={() => navigate(-1)}>
							취소
						</PE.Button>
						<Box
							component='button'
							sx={{
								width: '10%',
								padding: '8px 20px',
								fontSize: '1em',
								fontWeight: 'bold',
								borderRadius: '10px',
								border: 'none',
								cursor: 'pointer',
								color: 'text.primary',
								backgroundColor: 'background.book',
								'&:hover': {
									backgroundColor: 'background.hover',
								},
							}}
							type='button'
							onClick={() => handleWithDrawal()}
						>
							계정 삭제
						</Box>
					</PE.ContainerBtn>
				</PE.Form>

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
			</PE.Main>

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
