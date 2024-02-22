import { collection, getDocs, query } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export const getLikedBooks = async () => {
	const LikesRef = collection(appFirestore, 'BooksLikes');
	const likedQuery = query(LikesRef);
	const likedQuerySnapshot = await getDocs(likedQuery);
	const result = likedQuerySnapshot.docs.map((doc) => doc.data());

	return result;
};
