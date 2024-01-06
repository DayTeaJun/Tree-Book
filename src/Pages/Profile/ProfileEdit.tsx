import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ProfileMain } from './Profile.style';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function ProfileEdit() {
	const { user } = useAuthContext();
	const [displayName, setDisplayName] = useState('');
	const navigate = useNavigate();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setDisplayName(e.target.value);
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (appAuth.currentUser) {
			updateProfile(appAuth.currentUser, {
				displayName: displayName,
			})
				.then(() => {
					alert('닉네임이 변경되었습니다!');
					navigate('../');
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		}
	};

	return (
		<ProfileMain>
			<h1>{user?.displayName}의 프로필</h1>
			<form onSubmit={handleSubmit}>
				<label id='nickNameEdit'>프로필 수정</label>
				<input
					id='nickNameEdit'
					type='text'
					placeholder='변경할 닉네임을 입력해주세요.'
					value={displayName}
					onChange={handleName}
				/>
				<button type='submit'>변경</button>
			</form>
		</ProfileMain>
	);
}
