import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ProfileMain } from './Profile.style';
import {
	ChangeEvent,
	FormEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { appAuth, storage } from '../../Firebase/config';
import { updatePassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ProfileEditMain } from './ProfileEdit.style';
import persImg from '../../Assets/No-img.svg';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export function ProfileEdit() {
	const [displayName, setDisplayName] = useState('');
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const { user } = useAuthContext();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setDisplayName(e.target.value);
	};

	const handleSubmit: FormEventHandler = async (e) => {
		try {
			e.preventDefault();
			if (appAuth.currentUser) {
				await updateProfile(appAuth.currentUser, {
					displayName: displayName,
				});
				alert('닉네임이 변경되었습니다!');
				navigate('../');
			}
		} catch (error) {
			console.log('에러발생');
		}
	};

	const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		const image = e.target.files[0];
		const storageRef = ref(storage, `profile/${user?.uid}`);
		uploadBytes(storageRef, image).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((downUrl) => console.log(downUrl));
		});
	};

	return (
		<ProfileEditMain>
			<h1>프로필 수정</h1>
			<p>프로필을 수정 하실 수 있습니다</p>
			<div>
				<img src={persImg} />
				<form onSubmit={handleSubmit}>
					<label id='nickNameEdit'>닉네임</label>
					<input
						id='nickNameEdit'
						type='text'
						placeholder='변경할 닉네임을 입력해주세요.'
						value={displayName}
						onChange={handleName}
					/>
					<input
						type='file'
						accept='image/*'
						ref={inputRef}
						onChange={onUploadImage}
					/>
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
