import { collection, getDocs, limit, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getLikedBooks = async (book?: string) => {
	const LikesRef = collection(appFirestore, 'BooksLikes');
	const likedQuery = query(LikesRef, limit(12));
	const likedQuerySnapshot = await getDocs(likedQuery);
	const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());
	likedQueryData.sort(
		(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
	);
	console.log(likedQueryData);
	if (book === 'best') {
		const result = likedQueryData.slice(0, 2);
		return result;
	} else if (book === 'home') {
		const result = likedQueryData.slice(2, 12);
		return result;
	}
};
