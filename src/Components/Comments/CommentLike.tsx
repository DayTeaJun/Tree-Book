import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { CL } from './CommentList.style';
import { useState } from 'react';
import { useAuthContext } from '../../Context/useAuthContext';
import {
	collection,
	deleteField,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { appFirestore, timestamp } from '../../Firebase/config';
import { CommentType } from '../../Types/userType';
import { useQueryClient } from '@tanstack/react-query';
import { Box } from '@mui/material';
import ToastPopup from '../Toast/Toast';

export const CommentLike = ({ uid, item }: CommentType) => {
	const { user } = useAuthContext();
	const { likeBy }: any = item;
	const likedUser = user ? likeBy && likeBy[user!.uid] === true : false;
	const [likeAlready, setLikeAlready] = useState(likedUser);
	const [toast, setToast] = useState(false);
	const commentRef = doc(collection(appFirestore, 'comments'), uid);
	const queryClient = useQueryClient();

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
					setLikeAlready(false);
				}

				queryClient.invalidateQueries({ queryKey: ['comments'] });
			}
		} else {
			setToast(true);
		}
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<CL.LikedButton type='button' onClick={() => handleLike()}>
					{likeAlready ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
				</CL.LikedButton>
				<CL.LikedNumber>
					{likeBy &&
						Object.keys(likeBy).length !== 0 &&
						Object.keys(likeBy).length}
				</CL.LikedNumber>
			</Box>
			{toast && (
				<ToastPopup
					setToast={setToast}
					message={'로그인이 필요합니다!'}
					position={'top'}
				/>
			)}
		</>
	);
};
