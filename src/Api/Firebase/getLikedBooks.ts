import { collection, getDocs, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getLikedBooks = async (book?: string) => {
	const LikesRef = collection(appFirestore, 'BooksLikes');
	const likedQuery = query(LikesRef);
	const likedQuerySnapshot = await getDocs(likedQuery);
	const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());
	if (book === 'best') {
		likedQueryData.sort(
			(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
		);
		const result = likedQueryData.slice(0, 2);
		return result;
	} else if (book === 'home') {
		likedQueryData.sort(
			(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
		);
		const result = likedQueryData.slice(2, 12);
		return result;
	}
};
