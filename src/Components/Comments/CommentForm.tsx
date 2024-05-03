import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Context/useAuthContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookLikesProps } from '../../Types/bookType';
import { Box, TextField, Typography } from '@mui/material';
import { Label } from '../../Styles/Common';
import { useSnackbar } from 'notistack';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { Raiting } from '../Rating/Rating';

export function CommentForm({
	item,
	likedBook,
	preComment,
	setIsCommentEdit,
}: BookLikesProps) {
	const [comments, setComments] = useState('');
	const { addDocument, response } = useFirestore('comment');
	const { user } = useAuthContext();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const [ratingValue, setRatingValue] = useState<number | null>(0);
	const book: string = useParams().search || '';
	const displayName = (user && user.displayName) || '';
	const id = (user && user.uid) || '';
	const photoURL = (user && user.photoURL) || '';
	const isbn = item.isbn;

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		setComments(e.target.value);
	};

	const mutation = useMutation({
		mutationFn: addDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comment'] });
		},
		onError: (error) => {
			enqueueSnackbar('댓글 등록에 실패하였습니다.', { variant: 'error' });
			console.log(error);
		},
	});

	const handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();

		if (user) {
			const rating = ratingValue ?? 0;
			if (preComment && setIsCommentEdit) {
				const commentRef = doc(
					appFirestore,
					'comment',
					preComment.uid as string
				);
				await updateDoc(commentRef, {
					comments: comments,
					rating: rating,
					fixedComment: true,
				});
				queryClient.invalidateQueries({ queryKey: ['comment'] });
				setIsCommentEdit(false);

				enqueueSnackbar('댓글이 수정되었습니다.', { variant: 'success' });
			} else {
				mutation.mutate({
					...item,
					comments,
					book,
					displayName,
					id,
					photoURL,
					rating,
				});
				if (likedBook) {
					const commentTotalNumber = likedBook[0]?.commentTotalNumber ?? 0;

					await setDoc(doc(collection(appFirestore, 'LikedBook'), isbn), {
						...likedBook[0],
						...item,
						commentTotalNumber: commentTotalNumber + 1,
					});
					queryClient.invalidateQueries({ queryKey: ['LikedBook'] });
				}
				enqueueSnackbar('댓글이 등록되었습니다.', { variant: 'success' });
			}
		} else {
			enqueueSnackbar('로그인이 필요합니다!', { variant: 'error' });
		}
	};

	useEffect(() => {
		if (response.success) {
			setComments('');
		}
	}, [response.success]);

	useEffect(() => {
		if (preComment?.comments) {
			setComments(preComment.comments);
			if (preComment?.rating) {
				setRatingValue(preComment.rating);
			}
		}
	}, []);

	return (
		<>
			<Box
				component='form'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					gap: '10px',
				}}
				onSubmit={handleSubmit}
			>
				{!preComment && (
					<Typography component='h2' fontSize='1.2em' fontWeight='bold'>
						리뷰 등록
					</Typography>
				)}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
				>
					<Label htmlFor='commentInput'>리뷰 입력</Label>
					<Raiting ratingValue={ratingValue} setRatingValue={setRatingValue} />
					<TextField
						multiline
						rows={3}
						variant='outlined'
						sx={{
							flexShrink: 1,
							width: '100%',
						}}
						id='commentInput'
						placeholder='리뷰를 입력해주세요. (한번만 등록 가능합니다.)'
						name='content'
						value={comments}
						inputProps={{ maxLength: 300 }}
						onChange={handleData}
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Typography component='p'>
							{comments.replace(/<br\s*V?>/gm, '\n').length} / 300
						</Typography>
						<Box
							sx={{
								display: 'flex',
								gap: '20px',
							}}
						>
							{preComment && setIsCommentEdit && (
								<Box
									component='button'
									sx={{
										padding: '10px 15px',
										fontSize: '1em',
										fontWeight: 'bold',
										border: 'none',
										color: 'text.primary',
										backgroundColor: 'background.book',
										cursor: 'pointer',
										borderRadius: '5px',
										'&:hover': {
											backgroundColor: 'background.hover',
										},
									}}
									type='button'
									onClick={() => setIsCommentEdit(false)}
								>
									취소
								</Box>
							)}
							<Box
								component='button'
								sx={{
									padding: '10px 15px',
									fontSize: '1em',
									fontWeight: 'bold',
									border: 'none',
									color: 'text.primary',
									backgroundColor: 'background.book',
									cursor: comments.length > 0 ? 'pointer' : 'default',
									borderRadius: '5px',
									'&:hover': {
										backgroundColor:
											comments.length > 0
												? 'background.hover'
												: 'background.book',
									},
								}}
								type='submit'
								disabled={comments.length > 0 ? false : true}
							>
								{preComment ? '수정완료' : '리뷰 남기기'}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}
