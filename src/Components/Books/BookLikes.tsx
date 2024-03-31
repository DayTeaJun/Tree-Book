import { BookLikesProps } from '../../Types/bookType';
import { useAuthContext } from '../../Context/useAuthContext';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { appFirestore, timestamp } from '../../Firebase/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const BookLikes = ({
	item,
	id,
	search,
	page,
	setToast,
	setMessage,
}: BookLikesProps) => {
	const { user } = useAuthContext();
	const isbn = item.isbn;
	const { likeBy }: any = item;
	const likedUser = user ? likeBy && likeBy[user!.uid] === true : false;
	const [like, setLike] = useState<boolean | undefined>(likedUser);
	const [number, setNumber] = useState<number | undefined>();
	const booksRef = doc(collection(appFirestore, 'BooksLikes'), isbn);
	const queryClient = useQueryClient();

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['BooksLikes', isbn],
		queryFn: () => getDocuments('BooksLikes', isbn),
	});

	useEffect(() => {
		if (documents) {
			const likedUser = documents.find((book) => book.isbn === isbn);
			if (likedUser) {
				const likedNumber = likedUser?.likeBy
					? Object.values(likedUser.likeBy).filter((like) => like === true)
							.length
					: 0;
				setNumber(likedNumber);
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
				await setDoc(booksRef, {
					...item,
					likeBy,
					id,
					search,
					page,
					createdTime,
				});
				if (setToast && setMessage && number) {
					setNumber(number + 1);
					setMessage('좋아요가 등록되었습니다.');
					setToast(true);
				}
			} else {
				likeBy = { ...likedUser?.likeBy };
				delete likeBy[uid];
				if (Object.keys(likeBy).length === 0) {
					await deleteDoc(booksRef);
				} else {
					await setDoc(booksRef, {
						...item,
						likeBy,
						id,
						search,
						page,
						createdTime,
					});
				}
				if (setToast && setMessage && number) {
					setNumber(number - 1);
					setMessage('좋아요가 취소되었습니다.');
					setToast(true);
				}
			}
		} else {
			if (setToast && setMessage) {
				setMessage('로그인이 필요합니다!');
				setToast(true);
			}
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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
						color: 'background.mark',
						cursor: 'pointer',
					}}
					onClick={() => mutaion.mutate()}
				>
					{!like ? (
						<BookmarkBorderIcon fontSize='large' />
					) : (
						<BookmarkIcon fontSize='large' />
					)}
					{number !== 0 && number && (
						<Typography component='p' fontSize='1em' fontWeight='bold'>
							{number} 명
						</Typography>
					)}
				</Box>
			)}
		</>
	);
};

export default BookLikes;
