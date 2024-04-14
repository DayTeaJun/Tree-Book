import { BookLikesProps } from '../../Types/bookType';
import { useAuthContext } from '../../Context/useAuthContext';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { timestamp } from '../../Firebase/config';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BookLikes = ({ item, id, search, page, likedBook }: BookLikesProps) => {
	const { user } = useAuthContext();
	const isbn = item.isbn;
	const { likeBy }: any = item;
	const likedUser = user ? likeBy && likeBy[user!.uid] === true : false;
	const [like, setLike] = useState<boolean | undefined>(likedUser);
	const [number, setNumber] = useState<number | undefined>();
	const queryClient = useQueryClient();
	const { addDocument, deleteDocument } = useFirestore('LikedBook', isbn);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (likedBook) {
			const likedUser = likedBook.find((book) => book.isbn === isbn);
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
				setNumber(0);
			}
		}
	}, [likedBook]);

	const handleLikes = async () => {
		if (user && likedBook) {
			const likedUser = likedBook.find((book) => book.isbn === isbn);
			const uid = user.uid;
			let likeBy;
			const createdTime = timestamp.fromDate(new Date());
			if (!like) {
				likeBy = { ...likedUser?.likeBy, [uid]: !like };
				addMutation.mutate({
					...item,
					...likedBook[0],
					createdTime,
					likeBy,
					id,
					search,
					page,
				});
				if (number !== undefined) {
					setNumber(number + 1);
					enqueueSnackbar('즐겨찾기가 등록되었습니다.', { variant: 'success' });
				}
			} else {
				likeBy = { ...likedUser?.likeBy };
				delete likeBy[uid];
				addMutation.mutate({
					...item,
					...likedBook[0],
					createdTime,
					likeBy,
					id,
					search,
					page,
				});
				if (number) {
					setNumber(number - 1);
					enqueueSnackbar('즐겨찾기가 취소되었습니다.', { variant: 'success' });
				}
			}
		} else {
			enqueueSnackbar('로그인이 필요합니다!', { variant: 'error' });
		}
	};

	const addMutation = useMutation({
		mutationFn: addDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['LikedBook'] });
		},
		onError: (error) => {
			enqueueSnackbar('즐겨찾기가 오류로 인해 실패하였습니다.', {
				variant: 'error',
			});
			console.log(error);
		},
	});

	return (
		<>
			{likedBook && (
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						color: 'background.mark',
						cursor: 'pointer',
					}}
					onClick={() => handleLikes()}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
					<Typography
						component='p'
						fontSize='1em'
						fontWeight='bold'
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '5px',
						}}
					>
						<VisibilityIcon />
						{likedBook && likedBook.length > 0 ? likedBook[0].views : null}
					</Typography>
				</Box>
			)}
		</>
	);
};

export default BookLikes;
