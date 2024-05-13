import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getProfileData = async (uid: string, props: string) => {
	const LikesRef = collection(appFirestore, props);

	let likedQuery;
	if (props === 'likedBook') {
		likedQuery = query(LikesRef, where('likeBy.' + uid, '==', true));
	} else {
		likedQuery = query(LikesRef, where('id', '==', uid));
	}

	const likedQuerySnapshot = await getDocs(likedQuery);
	const result = likedQuerySnapshot.docs.map((doc) => doc.data());
	result.sort((a, b) => b.createdTime.seconds - a.createdTime.seconds);
	return result;
};
