import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Context/useAuthContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookLikesProps } from '../../Types/bookType';
import { Box, InputBase, Typography } from '@mui/material';
import { Label } from '../../Styles/Common';
import { useSnackbar } from 'notistack';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

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
			if (preComment && setIsCommentEdit) {
				const commentRef = doc(
					appFirestore,
					'comment',
					preComment.uid as string
				);
				await updateDoc(commentRef, {
					comments: comments,
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
		}
	}, []);
	if (likedBook) console.log(likedBook[0]?.commentTotalNumber);
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
						alignItems: 'center',
						justifyContent: 'space-around',
						gap: '20px',
						height: '40px',
					}}
				>
					<Label htmlFor='commentInput'>리뷰 입력</Label>
					<InputBase
						sx={{
							flexShrink: 1,
							width: '100%',
							height: '100%',
							padding: '10px',
							margin: '10px 0',
							backgroundColor: 'background.search',
						}}
						id='commentInput'
						type='text'
						placeholder='리뷰를 입력해주세요. (한번만 등록 가능합니다.)'
						name='content'
						value={comments}
						onChange={handleData}
					/>

					<Box
						component='button'
						sx={{
							width: '80px',
							height: '100%',
							padding: '5px',
							fontSize: '1em',
							fontWeight: 'bold',
							border: 'none',
							color: 'text.primary',
							backgroundColor: 'background.book',
							cursor: comments.length > 0 ? 'pointer' : 'default',
							'&:hover': {
								backgroundColor:
									comments.length > 0 ? 'background.hover' : 'background.book',
							},
						}}
						type='submit'
						disabled={comments.length > 0 ? false : true}
					>
						등록
					</Box>
					{preComment && setIsCommentEdit && (
						<Box
							component='button'
							sx={{
								width: '80px',
								height: '100%',
								padding: '5px',
								fontSize: '1em',
								fontWeight: 'bold',
								border: 'none',
								color: 'text.primary',
								backgroundColor: 'background.book',
								cursor: 'pointer',
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
				</Box>
			</Box>
		</>
	);
}
