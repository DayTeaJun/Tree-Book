import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { appAuth, storage } from '../../Firebase/config';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ProfileEditMain } from './ProfileEdit.style';
import persImg from '../../Assets/No-img.svg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ImgPreview } from '../../Hook/useImgPreview';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export function ProfileEdit() {
	const { user } = useAuthContext();
	const [displayName, setDisplayName] = useState(user?.displayName || '');
	const navigate = useNavigate();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();
	const { addDocument, response } = useFirestore('user');

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setDisplayName(e.target.value);
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

					const docRef = doc(colRef, 'user');
					await updateDoc(docRef, { displayName: displayName });
				}

				alert('프로필이 변경되었습니다!');
				navigate('../');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ProfileEditMain>
			<h1>프로필 수정</h1>
			<p>프로필을 수정 하실 수 있습니다</p>
			<div>
				<img src={(imgUrl && imageSrc) || user?.photoURL || persImg} />
				<form onSubmit={handleSubmit}>
					<label id='nickNameEdit'>닉네임</label>
					<input
						id='nickNameEdit'
						type='text'
						placeholder='변경할 닉네임을 입력해주세요.'
						value={displayName}
						onChange={handleName}
					/>
					<input type='file' accept='image/*' onChange={(e) => onUpload(e)} />
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
