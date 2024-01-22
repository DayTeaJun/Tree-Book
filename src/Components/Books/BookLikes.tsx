import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { D } from '../../Pages/BookDetail/bookDetail.style';
import { ItemProps } from '../../Types/bookData';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useEffect, useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore, timestamp } from '../../Firebase/config';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';

const BookLikes = ({ item }: ItemProps) => {
	const [like, setLike] = useState<boolean | undefined>(false);
	const [likesNumber, setLikesNumber] = useState<number>();
	const { documents, error, isLoading } = useCollection('BooksLikes');
	const book = item.title;
	const isbn = item.isbn;
	const booksRef = doc(collection(appFirestore, 'BooksLikes'), isbn);
	const { user } = useAuthContext();

	useEffect(() => {
		if (documents) {
			const likedUser = documents.find((book) => book.isbn === isbn);
			if (likedUser) {
				const likedNumber = likedUser?.likeBy
					? Object.values(likedUser.likeBy).filter((like) => like === true)
							.length
					: 0;
				setLikesNumber(likedNumber);
				if (user) {
					const isUser =
						likedUser.likeBy &&
						likedUser.likeBy[user.uid as keyof typeof likedUser.likeBy] ===
							true;
					setLike(isUser);
				}
			} else {
				setLike(false);
			}
		}
	}, [documents]);

	const handleLikes = async () => {
		if (user && documents) {
			const likedUser = documents.find((book) => book.isbn === isbn);
			const uid = user.uid;
			const createdTime = timestamp.fromDate(new Date());
			let likeBy;
			if (!like) {
				likeBy = { ...likedUser?.likeBy, [uid]: !like };
			} else {
				likeBy = { ...likedUser?.likeBy, [uid]: !like };
			}
			await setDoc(booksRef, {
				book,
				isbn,
				likeBy,
				createdTime,
			});
		} else {
			alert('로그인이 필요합니다!');
		}
	};

	return (
		<>
			{item && (
				<D.Likes onClick={handleLikes}>
					{like === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
					{likesNumber && <D.P>{likesNumber}</D.P>}
				</D.Likes>
			)}
		</>
	);
};

export default BookLikes;
