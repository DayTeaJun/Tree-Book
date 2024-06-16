import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
	appAuth,
	appFirestore,
	storage,
	timestamp,
} from '../../Firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { SignupType } from '../../Types/userType';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { loginAuth } from '../../Redux/authSlice';

export const useSignup = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const signup = async ({
		email,
		password,
		displayName,
		intro,
		imgUrl,
	}: SignupType) => {
		try {
			const userCreadential = await createUserWithEmailAndPassword(
				appAuth,
				email,
				password
			);

			const user = userCreadential.user;
			if (!user) {
				enqueueSnackbar('회원가입이 실패하였습니다.', { variant: 'error' });
				throw new Error('회원가입 실패');
			}

			if (appAuth.currentUser && user) {
				const uid = user.uid;
				const createdTime = timestamp.fromDate(new Date());
				const userDocRef = doc(collection(appFirestore, 'user'), uid);

				let photoURL;

				if (imgUrl) {
					const storageRef = ref(storage, `profile/${user.uid}`);
					const snapshot = await uploadBytes(storageRef, imgUrl);
					photoURL = await getDownloadURL(snapshot.ref);
				} else {
					const pathReference = ref(
						storage,
						`profile/Temporary Profile/tem_img.png`
					);
					photoURL = await getDownloadURL(pathReference);
				}

				try {
					await setDoc(userDocRef, {
						email,
						password,
						displayName,
						intro,
						photoURL,
						uid,
						createdTime,
					});
					enqueueSnackbar('회원가입이 성공하였습니다.', { variant: 'success' });
					await updateProfile(appAuth.currentUser, { displayName, photoURL });
					dispatch(loginAuth(user));
				} catch (error) {
					enqueueSnackbar('회원가입이 실패하였습니다.', { variant: 'error' });
				}
			}
		} catch (error) {
			enqueueSnackbar('회원가입이 실패하였습니다.', { variant: 'error' });
		}
	};
	return { signup };
};
