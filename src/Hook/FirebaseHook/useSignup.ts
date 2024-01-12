import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { appAuth, storage } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';
import { AuthContextProps } from '../../Context/AuthContext';
import { useFirestore } from './useFirestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export interface SignupType {
	email: string;
	password: string;
	displayName: string;
	imgUrl?: Blob;
}
export const useSignup = () => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext() as AuthContextProps;
	const { addDocument, response } = useFirestore('user');

	const signup = async ({
		email,
		password,
		displayName,
		imgUrl,
	}: SignupType) => {
		try {
			setError(null);
			setIsPending(true);

			const userCreadential = await createUserWithEmailAndPassword(
				appAuth,
				email,
				password
			);

			const user = userCreadential.user;
			if (!user) {
				throw new Error('회원가입 실패');
			}

			if (appAuth.currentUser && imgUrl) {
				const storageRef = ref(storage, `profile/${user?.uid}`);
				const snapshot = await uploadBytes(storageRef, imgUrl);
				const photoURL = await getDownloadURL(snapshot.ref);

				addDocument({
					email,
					password,
					displayName,
					photoURL,
				});

				try {
					await updateProfile(appAuth.currentUser, { displayName, photoURL });
					dispatch({ type: 'login', payload: user });
					setError(null);
					setIsPending(false);
				} catch (error) {
					setError((error as Error).message);
					setIsPending(false);
				}
			}
		} catch (error) {
			setError((error as Error).message);
			setIsPending(false);
		}
	};
	return { error, isPending, signup };
};
