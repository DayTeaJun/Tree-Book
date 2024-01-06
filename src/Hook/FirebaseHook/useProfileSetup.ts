import { updateProfile } from 'firebase/auth';
import { appAuth } from '../../Firebase/config';

const useProfileSetup = (displayName: string) => {
	if (appAuth.currentUser) {
		updateProfile(appAuth.currentUser, {
			displayName: displayName,
		})
			.then(() => {
				alert('닉네임이 변경되었습니다!');
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	}
};
