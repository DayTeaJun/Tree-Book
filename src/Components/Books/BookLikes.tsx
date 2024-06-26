import { BookLikesProps } from '../../Types/bookType';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { timestamp } from '../../Firebase/config';
import { useSnackbar } from 'notistack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const BookLikes = ({ item, id, search, page, likedBook }: BookLikesProps) => {
	const { user } = useSelector((state: RootState) => state.user);
	const isbn = item.isbn;
	const isLike = likedBook && likedBook[0];
	const likedUser =
		user && isLike ? isLike.likeBy && isLike.likeBy[user.uid] === true : false;
	const likedNumber = isLike?.likeBy
		? Object.values(isLike.likeBy).filter((likeBy) => likeBy === true).length
		: 0;
	const [like, setLike] = useState<boolean | undefined>(likedUser || false);
	const [number, setNumber] = useState<number | undefined>(likedNumber || 0);
	const queryClient = useQueryClient();
	const { addDocument } = useFirestore('likedBook', isbn);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (likedBook) {
			if (likedUser && user && isLike) {
				const isUser =
					isLike.likeBy &&
					isLike.likeBy[user.uid as keyof typeof isLike.likeBy] === true;
				setLike(isUser);
			} else {
				setLike(false);
			}
		}
	}, [likedBook, user, likedUser, isLike]);

	const handleLikes = async () => {
		if (user && likedBook) {
			const isLike = likedBook[0];
			const uid = user.uid;
			let likeBy;
			const createdTime = timestamp.fromDate(new Date());
			setLike(!like);
			if (!like) {
				likeBy = { ...isLike?.likeBy, [uid]: !like };
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
				likeBy = { ...isLike?.likeBy };
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
			queryClient.invalidateQueries({ queryKey: ['likedBook'] });
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
						width: '80%',
						height: '40px',
						margin: '0 auto',
						display: 'flex',
						color: 'background.mark',
						cursor: 'pointer',
						border: '1.5px solid',
						borderRadius: '5px',
						borderColor: 'background.mark',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onClick={() => handleLikes()}
				>
					{!like ? (
						<FavoriteBorderIcon fontSize='small' />
					) : (
						<FavoriteIcon fontSize='small' />
					)}
					{number !== 0 && number && (
						<Typography component='p' fontSize='1em' fontWeight='bold'>
							{number}
						</Typography>
					)}
				</Box>
			)}
		</>
	);
};

export default BookLikes;
