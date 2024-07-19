import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useFirestore } from '../../../Hook/FirebaseHook/useFirestore';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookLikesProps } from '../../../Types/bookType';
import {
	Box,
	Checkbox,
	FormControlLabel,
	TextField,
	Typography,
} from '@mui/material';
import { Label } from '../../../Styles/Common';
import { useSnackbar } from 'notistack';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { appFirestore } from '../../../Firebase/config';
import { Raiting } from '../../../Components/Rating/Rating';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { useGetUserQuery } from '../../../Hook/QueryHook/getUserQuery';

export function CommentForm({
	item,
	likedBook,
	preComment,
	setIsCommentEdit,
}: BookLikesProps) {
	const [comments, setComments] = useState('');
	const [checked, setChecked] = useState(false);
	const { addDocument } = useFirestore('comment');
	const { user } = useSelector((state: RootState) => state.user);
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

	const { data: userData } = useGetUserQuery(displayName);

	const handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		if (ratingValue === 0) {
			return enqueueSnackbar('별점 1점 이상 입력해주세요!', {
				variant: 'error',
			});
		}

		if (user && userData) {
			const rating = ratingValue ?? 0;
			if (preComment && setIsCommentEdit && likedBook) {
				const ratingBy = { ...likedBook[0]?.ratingBy, [user.uid]: rating };
				const commentRef = doc(
					appFirestore,
					'comment',
					preComment.uid as string
				);
				await updateDoc(commentRef, {
					comments: comments,
					rating: rating,
					fixedComment: true,
					checked: checked,
				});
				await setDoc(doc(collection(appFirestore, 'likedBook'), isbn), {
					...likedBook[0],
					...item,
					ratingBy,
				});
				const ratingNumber = likedBook[0].ratingBy
					? likedBook[0].ratingBy[user.uid]
					: 0;
				const ratingNumberTotal = userData.ratingBook
					? userData.ratingBook[rating]
					: 0;
				const ratingUserTotal = userData.ratingBook
					? userData.ratingBook[ratingNumber]
					: 0;
				let ratingBook;
				if (rating === ratingNumber) {
					ratingBook = {
						...userData?.ratingBook,
					};
				} else {
					ratingBook = {
						...userData?.ratingBook,
						[rating]: (ratingNumberTotal ?? 0) + 1,
						[ratingNumber]: (ratingUserTotal ?? 0) - 1,
					};
				}

				await setDoc(doc(collection(appFirestore, 'user'), user.uid), {
					...userData,
					ratingBook,
				});
				queryClient.invalidateQueries({ queryKey: ['likedBook'] });
				queryClient.invalidateQueries({ queryKey: ['comment'] });
				setIsCommentEdit(false);

				enqueueSnackbar('댓글이 수정되었습니다.', { variant: 'success' });
			} else {
				if (likedBook) {
					mutation.mutate({
						...item,
						comments,
						book,
						displayName,
						id,
						photoURL,
						rating,
						checked,
					});
					const ratingBy = { ...likedBook[0]?.ratingBy, [user.uid]: rating };
					await setDoc(doc(collection(appFirestore, 'likedBook'), isbn), {
						...likedBook[0],
						...item,
						ratingBy,
					});
					const ratingTotalNumber =
						(userData.ratingBook &&
							(userData.ratingBook[rating]
								? userData.ratingBook[rating]
								: 0)) ??
						0;
					const ratingBook = {
						...userData?.ratingBook,
						[rating]: ratingTotalNumber + 1,
					};
					await setDoc(doc(collection(appFirestore, 'user'), user.uid), {
						...userData,
						ratingBook,
					});
					queryClient.invalidateQueries({ queryKey: ['likedBook'] });
					enqueueSnackbar('댓글이 등록되었습니다.', { variant: 'success' });
				}
			}
		} else {
			enqueueSnackbar('로그인이 필요합니다!', { variant: 'error' });
		}
	};

	useEffect(() => {
		if (preComment?.comments) {
			setComments(preComment.comments);
			if (preComment?.rating) {
				setRatingValue(preComment.rating);
			}
			if (preComment?.checked) {
				setChecked(preComment.checked);
			}
		}
	}, [preComment]);

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
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								handleSubmit(event);
							}
						}}
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
							<FormControlLabel
								control={
									<Checkbox
										checked={checked}
										onChange={() => setChecked(!checked)}
										inputProps={{
											'aria-label': '스포일러 체크박스',
										}}
									/>
								}
								label='스포일러가 있습니다.'
							/>
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
