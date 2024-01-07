import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ProfileMain } from './Profile.style';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ProfileEditMain } from './ProfileEdit.style';
import persImg from '../../Assets/No-img.svg';
import { Link } from 'react-router-dom';

export function ProfileEdit() {
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
