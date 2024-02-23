import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { CL } from './CommentList.style';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/useAuthContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { CommentType } from '../../Types/userType';

export const CommentLike = ({ uid, item, likeBy }: CommentType) => {
	const { user } = useAuthContext();
	const likeComment = likeBy || false;
	const [like, setLike] = useState(likeComment);
	const commentRef = doc(collection(appFirestore, 'comments'), uid);

	useEffect(() => {});

	const handleLike = async () => {
		if (user) {
			if (item && uid) {
				let likeBy;
				const createdTime = item.createdTime;
				if (!like) {
					setLike(true);
					likeBy = { ...item.likeBy, [user.uid]: !like };
				} else if (like) {
					setLike(false);
					likeBy = { ...item.likeBy };
				}
				await setDoc(commentRef, {
					...item,
					likeBy,
					createdTime,
				});
			}
		} else {
			alert('로그인이 필요합니다!');
		}
	};

	return (
		<>
			<CL.LikeButton type='button' onClick={() => handleLike()}>
				{like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
			</CL.LikeButton>
		</>
	);
};
