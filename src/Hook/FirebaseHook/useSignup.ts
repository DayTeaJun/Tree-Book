import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';
import { AuthContextProps } from '../../Context/AuthContext';

export interface SignupType {
	email: string;
	password: string;
	displayName: string;
}
export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext() as AuthContextProps;

	const signup = ({ email, password, displayName }: SignupType) => {
		setError(null); // 아직 에러 없음
		setIsPending(true); // 통신 진행중

		// 회원가입
		createUserWithEmailAndPassword(appAuth, email, password)
			.then((userCreadential) => {
				// 회원가입 완료시 사용자 정보 저장
				const user = userCreadential.user;
				console.log(user);
				console.log(typeof user);

				if (!user) {
					throw new Error('회원가입 실패');
				}

				// 회웝가입 진행이 되면, 유저 정보 업데이트(닉네임 업데이트)
				// appAuth.currentUser 는 현재 로그인한 유저의 정보
				if (appAuth.currentUser) {
					updateProfile(appAuth.currentUser, { displayName })
						.then(() => {
							dispatch({ type: 'login', payload: user });
							setError(null);
							setIsPending(false);
						})
						.catch((err) => {
							setError(err.message);
							setIsPending(false);
						});
				}
			})
			.catch((err) => {
				setError(err.message);
				setIsPending(false);
			});
	};
	return { error, isPending, signup };
};
