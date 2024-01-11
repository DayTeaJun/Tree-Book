import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import {
	ChangeEvent,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react';
import { appAuth, storage } from '../../Firebase/config';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ProfileEditMain } from './ProfileEdit.style';
import persImg from '../../Assets/No-img.svg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export function ProfileEdit() {
	const { user } = useAuthContext();
	const [displayName, setDisplayName] = useState(user?.displayName || '');
	const [profileImg, setProfileImg] = useState('');
	const navigate = useNavigate();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setDisplayName(e.target.value);
	};

	const handleSubmit: FormEventHandler = async (e) => {
		try {
			e.preventDefault();
			if (appAuth.currentUser) {
				await updateProfile(appAuth.currentUser, {
					displayName: displayName,
					photoURL: profileImg || '',
				});
				alert('프로필이 변경되었습니다!');
				navigate('../');
			}
		} catch (error) {
			console.log('에러발생');
		}
	};

	const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		try {
			const image = e.target.files[0];
			const storageRef = ref(storage, `profile/${user?.uid}`);
			const snapshot = await uploadBytes(storageRef, image);
			const downUrl = await getDownloadURL(snapshot.ref);
			setProfileImg(downUrl);
		} catch (error) {
			console.log('에러발생');
		}
	};

	return (
		<ProfileEditMain>
			<h1>프로필 수정</h1>
			<p>프로필을 수정 하실 수 있습니다</p>
			<div>
				<img src={profileImg || user?.photoURL || persImg} />
				<form onSubmit={handleSubmit}>
					<label id='nickNameEdit'>닉네임</label>
					<input
						id='nickNameEdit'
						type='text'
						placeholder='변경할 닉네임을 입력해주세요.'
						value={displayName}
						onChange={handleName}
					/>
					<input type='file' accept='image/*' onChange={onUploadImage} />
					<div>
						<button type='submit'>변경</button>

						<button type='button' onClick={() => navigate(-1)}>
							취소
						</button>
					</div>
				</form>
			</div>
		</ProfileEditMain>
	);
}
