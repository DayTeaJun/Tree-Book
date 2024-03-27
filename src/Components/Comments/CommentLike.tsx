import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/useAuthContext';
import {
	collection,
	deleteField,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { CommentType } from '../../Types/userType';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import ToastPopup from '../Toast/Toast';

export const CommentLike = ({ uid, item }: CommentType) => {
	const { user } = useAuthContext();
	const { likeBy }: any = item;
	const [likeAlready, setLikeAlready] = useState(false);
	const [toast, setToast] = useState(false);
	const [message, setMessage] = useState('');
	const commentRef = doc(collection(appFirestore, 'comments'), uid);
	const queryClient = useQueryClient();

	useEffect(() => {
		const likedUser = user ? likeBy && likeBy[user!.uid] === true : false;
		setLikeAlready(likedUser);
	}, [item]);

	const handleLike = async () => {
		if (user) {
			if (item && uid) {
				let likeBy;
				if (!likeAlready) {
					likeBy = { ...item.likeBy, [user.uid]: true };
					setLikeAlready(true);
					await setDoc(commentRef, {
						...item,
						likeBy,
					});
					setMessage('좋아요가 등록되었습니다.');
					setToast(true);
				} else if (likeAlready) {
					likeBy = { ...item.likeBy };
					delete likeBy[user.uid];
					if (Object.keys(likeBy).length === 0) {
						await updateDoc(commentRef, {
							likeBy: deleteField(),
						});
					} else {
						await setDoc(commentRef, {
							...item,
							likeBy,
						});
					}
					setMessage('좋아요가 취소되었습니다.');
					setToast(true);
					setLikeAlready(false);
				}

				queryClient.invalidateQueries({ queryKey: ['comments'] });
			}
		} else {
			setMessage('로그인이 필요합니다!');
			setToast(true);
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
					{likeBy &&
						Object.keys(likeBy).length !== 0 &&
						Object.keys(likeBy).length}
				</Typography>
			</Box>
			{toast && (
				<ToastPopup setToast={setToast} message={message} position={'top'} />
			)}
		</>
	);
};
