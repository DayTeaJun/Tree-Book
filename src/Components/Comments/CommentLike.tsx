import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { CL } from './CommentList.style';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/useAuthContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore, timestamp } from '../../Firebase/config';
import { CommentType } from '../../Types/userType';
import { useQueryClient } from '@tanstack/react-query';
import { Box } from '@mui/material';

export const CommentLike = ({ uid, item }: CommentType) => {
	const { user } = useAuthContext();
	const { likeBy }: any = item;
	const likedUser = user ? likeBy && likeBy[user!.uid] === true : false;
	const [likeAlready, setLikeAlready] = useState(likedUser);
	const commentRef = doc(collection(appFirestore, 'comments'), uid);
	const queryClient = useQueryClient();

	const handleLike = async () => {
		if (user) {
			if (item && uid) {
				let likeBy;
				const createdTime = item.createdTime;
				if (!likeAlready) {
					likeBy = { ...item.likeBy, [user.uid]: true };
					setLikeAlready(true);
				} else if (likeAlready) {
					likeBy = { ...item.likeBy };
					delete likeBy[user.uid];
					setLikeAlready(false);
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
	);
};
