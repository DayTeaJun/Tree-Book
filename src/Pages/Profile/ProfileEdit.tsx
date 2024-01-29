import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
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

export function ProfileEdit() {
	const { user } = useAuthContext();
	const location = useLocation();
	const [displayName, setDisplayName] = useState(user?.displayName || '');
	const [userIntro, setUserIntro] = useState(location.state.intro || '');
	const navigate = useNavigate();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();
	const [validName, setValidName] = useState('');
	const debounceName = useDebounce<string>(displayName);
	const userRef = collection(appFirestore, 'user');

	const validCheck = async () => {
		const Query = query(userRef, where('displayName', '==', displayName));
		const querySnapshot = await getDocs(Query);
		if (!(user?.displayName === displayName) && querySnapshot.docs.length > 0) {
			setValidName('중복된 닉네임입니다.');
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

	const handleSubmit: FormEventHandler = async (e) => {
		try {
			e.preventDefault();
			if (appAuth.currentUser) {
				if (imgUrl) {
					const storageRef = ref(storage, `profile/${user?.uid}`);
					const snapshot = await uploadBytes(storageRef, imgUrl);
					const downUrl = await getDownloadURL(snapshot.ref);

					await updateProfile(appAuth.currentUser, {
						displayName: displayName,
						photoURL: downUrl || '',
					});
				} else {
					await updateProfile(appAuth.currentUser, {
						displayName: displayName,
					});
					const colRef = collection(appFirestore, 'user');

					const docRef = doc(colRef, user!.uid);
					await updateDoc(docRef, {
						displayName: displayName,
						intro: userIntro,
					});
				}

				alert('프로필이 변경되었습니다!');
				navigate(-1);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<PE.Main>
			<PE.H1>프로필 수정</PE.H1>
			<PE.P>프로필을 수정 하실 수 있습니다</PE.P>
			<PE.Form onSubmit={handleSubmit}>
				<PE.ContainerImg>
					<PE.Img
						src={(imgUrl && imageSrc) || user?.photoURL || persImg}
						alt={'프로필 이미지 사진입니다.'}
					/>
					<PE.Label htmlFor='profileImgEdit'>프로필 이미지 수정</PE.Label>
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
				<PE.Label htmlFor='introEdit'>자기소개</PE.Label>
				<PE.Input
					id='introEdit'
					type='text'
					placeholder='자신에 대해서 소개해주세요.'
					value={userIntro}
					onChange={handleEdit}
				/>
				<PE.PValid>{validName || '\u00A0'}</PE.PValid>

				<PE.ContainerBtn>
					<PE.Button type='submit'>변경</PE.Button>

					<PE.Button type='button' onClick={() => navigate(-1)}>
						취소
					</PE.Button>
				</PE.ContainerBtn>
			</PE.Form>
		</PE.Main>
	);
}
