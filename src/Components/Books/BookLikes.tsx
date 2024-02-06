import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { D } from '../../Pages/BookDetail/bookDetail.style';
import { BookLikesProps } from '../../Types/bookType';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useEffect, useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore, timestamp } from '../../Firebase/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';

const BookLikes = ({ item, id, search, page }: BookLikesProps) => {
	const [like, setLike] = useState<boolean | undefined>(false);
	const [likesNumber, setLikesNumber] = useState<number>();
	const isbn = item.isbn;
	const booksRef = doc(collection(appFirestore, 'BooksLikes'), isbn);
	const { user } = useAuthContext();
	const queryClient = useQueryClient();

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['BooksLikes'],
		queryFn: () => getDocuments('BooksLikes'),
	});

	useEffect(() => {
		if (documents) {
			const likedUser = documents.result.find((book) => book.isbn === isbn);
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
			const likedUser = documents.result.find((book) => book.isbn === isbn);
			const uid = user.uid;
			const createdTime = timestamp.fromDate(new Date());
			let likeBy;
			if (!like) {
				likeBy = { ...likedUser?.likeBy, [uid]: !like };
			} else {
				likeBy = { ...likedUser?.likeBy };
				delete likeBy[uid];
			}
			await setDoc(booksRef, {
				...item,
				likeBy,
				id,
				search,
				page,
				createdTime,
			});
		} else {
			alert('로그인이 필요합니다!');
		}
	};

	const mutaion = useMutation({
		mutationFn: handleLikes,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['BooksLikes'] });
		},
		onError: () => {
			console.log('Error');
		},
	});

	return (
		<>
			{item && (
				<D.Likes onClick={() => mutaion.mutate()}>
					{like === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
					{likesNumber && <D.P>{likesNumber}</D.P>}
				</D.Likes>
			)}
		</>
	);
};

export default BookLikes;
