import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useEffect, useState } from 'react';
import { collection, deleteField, doc, updateDoc } from 'firebase/firestore';
import { appFirestore } from '../../../Firebase/config';
import { CommentType } from '../../../Types/componentType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { useFirestore } from '../../../Hook/FirebaseHook/useFirestore';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

export const CommentLike = ({ uid, item }: CommentType) => {
	const { user } = useSelector((state: RootState) => state.user);
	const { likeBy } = item;
	const [likeAlready, setLikeAlready] = useState(false);
	const [likedNumber, setLikedNumber] = useState(0);
	const { addDocument } = useFirestore('comment', uid);
	const commentRef = doc(collection(appFirestore, 'comment'), uid);
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (user && likeBy) {
			const likedUser = !!likeBy[user.uid];
			setLikeAlready(likedUser);
			setLikedNumber(Object.keys(likeBy).length);
		} else {
			setLikeAlready(false);
			setLikedNumber(0);
		}
	}, [user, likeBy]);

	const mutation = useMutation({
		mutationFn: addDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comment'] });
		},
		onError: (error) => {
			enqueueSnackbar('좋아요가 실패하였습니다.', { variant: 'error' });
			console.log(error);
		},
	});

	const handleLike = async () => {
		if (user) {
			if (item && uid) {
				let likeBy;
				if (!likeAlready) {
					setLikedNumber(likedNumber + 1);
					setLikeAlready(true);
					likeBy = { ...item.likeBy, [user.uid]: true };
					mutation.mutate({ ...item, likeBy });
					enqueueSnackbar('좋아요가 등록되었습니다.', { variant: 'success' });
				} else if (likeAlready) {
					setLikedNumber(likedNumber - 1);
					setLikeAlready(false);
					likeBy = { ...item.likeBy };
					delete likeBy[user.uid];
					if (Object.keys(likeBy).length === 0) {
						await updateDoc(commentRef, {
							likeBy: deleteField(),
						});
					} else {
						mutation.mutate({ ...item, likeBy });
					}
					enqueueSnackbar('좋아요가 취소되었습니다.', { variant: 'success' });
				}

				queryClient.invalidateQueries({ queryKey: ['comment'] });
			}
		} else {
			enqueueSnackbar('로그인이 필요합니다!', { variant: 'error' });
		}
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
				<Box
					component='button'
					sx={{
						background: 'inherit',
						cursor: 'pointer',
						border: 'none',
						color: 'background.mark',
					}}
					type='button'
					onClick={() => handleLike()}
				>
					{likeAlready ? (
						<ThumbUpAltIcon fontSize='small' />
					) : (
						<ThumbUpOffAltIcon fontSize='small' />
					)}
				</Box>
				<Typography
					component='p'
					fontSize='0.8em'
					fontWeight='bold'
					color='text.primary'
				>
					{likedNumber !== 0 ? likedNumber : null}
				</Typography>
			</Box>
		</>
	);
};
