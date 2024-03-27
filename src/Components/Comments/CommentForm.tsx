import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Context/useAuthContext';
import { useLocation, useParams } from 'react-router-dom';
import { CommentList } from './CommentList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ToastPopup from '../Toast/Toast';
import { BookLikesProps } from '../../Types/bookType';
import { Box, InputBase, Typography } from '@mui/material';
import { Label } from '../../Styles/Common';

export function CommentForm({ item }: BookLikesProps) {
	const [comments, setComments] = useState('');
	const [toast, setToast] = useState(false);
	const [message, setMessage] = useState('');
	const { addDocument, response } = useFirestore('comments');
	const { user } = useAuthContext();
	const location = useLocation();
	const queryClient = useQueryClient();

	const book: string = useParams().search || '';
	const isbn = location.state.isbn;

	const displayName = (user && user.displayName) || '';
	const id = (user && user.uid) || '';
	const photoURL = (user && user.photoURL) || '';

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		setComments(e.target.value);
	};

	const mutation = useMutation({
		mutationFn: addDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comments'] });
		},
		onError: () => {
			console.log('Error');
		},
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (user) {
			mutation.mutate({
				...item,
				comments,
				book,
				displayName,
				id,
				photoURL,
			});
			setToast(true);
			setMessage('댓글이 등록되었습니다.');
		} else {
			setToast(true);
			setMessage('로그인이 필요합니다!');
		}
	};

	useEffect(() => {
		if (response.success) {
			setComments('');
		}
	}, [response.success]);

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
				<Typography component='h2' fontSize='1.2em' fontWeight='bold'>
					댓글
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						gap: '20px',
						height: '40px',
					}}
				>
					<Label htmlFor='commentInput'>댓글 입력</Label>
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
						placeholder='댓글 내용을 입력해주세요.'
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
							borderRadius: '10px',
							color: 'text.primary',
							backgroundColor:
								comments.length > 0 ? 'background.hover' : 'background.book',
							cursor: comments.length > 0 ? 'pointer' : 'default',
						}}
						type='submit'
						disabled={comments.length > 0 ? false : true}
					>
						등록
					</Box>
				</Box>
			</Box>
			<CommentList isbn={isbn} />
			{toast && (
				<ToastPopup setToast={setToast} message={message} position={'top'} />
			)}
		</>
	);
}
