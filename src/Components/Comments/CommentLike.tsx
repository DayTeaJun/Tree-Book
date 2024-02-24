import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { CL } from './CommentList.style';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/useAuthContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { CommentType } from '../../Types/userType';
import { useQueryClient } from '@tanstack/react-query';

export const CommentLike = ({ uid, item }: CommentType) => {
	const { user } = useAuthContext();
	const { likeBy }: any = item;
	const lkedUser = likeBy && likeBy.includes(user?.uid);
	const commentRef = doc(collection(appFirestore, 'comments'), uid);
	const queryClient = useQueryClient();

	const handleLike = async () => {
		if (user) {
			if (item && uid) {
				let likeBy;
				const createdTime = item.createdTime;
				if (!lkedUser) {
					likeBy = { ...item.likeBy, [user.uid]: !lkedUser };
				} else if (lkedUser) {
					likeBy = { ...item.likeBy };
				}
				await setDoc(commentRef, {
					...item,
					likeBy,
					createdTime,
				});
				queryClient.invalidateQueries({ queryKey: ['comments'] });
			}
		} else {
			alert('로그인이 필요합니다!');
		}
	};

	return (
		<>
			<CL.LikeButton type='button' onClick={() => handleLike()}>
				{lkedUser ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
			</CL.LikeButton>
		</>
	);
};
