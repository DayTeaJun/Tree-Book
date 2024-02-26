import { collection, getDocs, limit, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getLikedBooks = async (book?: string) => {
	const LikesRef = collection(appFirestore, 'BooksLikes');
	const likedQuery = query(LikesRef, limit(17));
	const likedQuerySnapshot = await getDocs(likedQuery);
	const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());
	const likedBooks = likedQueryData.filter(
		(doc) => Object.keys(doc.likeBy).length > 0
	);
	if (book === 'best') {
		likedBooks.sort(
			(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
		);
		const result = likedBooks.slice(0, 2);
		return result;
	} else if (book === 'home') {
		likedBooks.sort(
			(a, b) => Object.keys(b.likeBy).length - Object.keys(a.likeBy).length
		);
		const result = likedBooks.slice(3, 17);
		return result;
	}
};
