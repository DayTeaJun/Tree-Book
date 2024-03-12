import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { CF } from './CommentForm.style';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Context/useAuthContext';
import { useLocation, useParams } from 'react-router-dom';
import { CommentList } from './CommentList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ToastPopup from '../Toast/Toast';
import { BookLikesProps } from '../../Types/bookType';

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
			<CF.Form onSubmit={handleSubmit}>
				<CF.H2>댓글쓰기</CF.H2>
				<CF.Container>
					<CF.Label htmlFor='commentInput'>댓글 입력</CF.Label>
					<CF.Input
						id='commentInput'
						type='text'
						placeholder='댓글 내용을 입력해주세요.'
						name='content'
						value={comments}
						onChange={handleData}
					/>

					<CF.Button type='submit'>등록</CF.Button>
				</CF.Container>
			</CF.Form>
			<CommentList isbn={isbn} />
			{toast && (
				<ToastPopup setToast={setToast} message={message} position={'top'} />
			)}
		</>
	);
}
