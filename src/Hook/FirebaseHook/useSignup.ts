import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { appAuth, appFirestore, storage } from '../../Firebase/config';
import { useAuthContext } from './useAuthContext';
import { AuthContextProps } from '../../Context/AuthContext';
import { useFirestore } from './useFirestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';

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
				const uid = user.uid;

				const userDocRef = doc(collection(appFirestore, 'user'), uid);

				await setDoc(userDocRef, {
					email,
					password,
					displayName,
					photoURL,
					uid,
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
