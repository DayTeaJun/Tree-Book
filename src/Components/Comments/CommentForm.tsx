import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { CF } from './CommentForm.style';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useLocation, useParams } from 'react-router-dom';
import { CommentList } from './CommentList';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function CommentForm() {
	const [comments, setComments] = useState('');
	const { addDocument, response } = useFirestore('comments');
	const { user } = useAuthContext();
	const location = useLocation();
	const queryClient = useQueryClient();

	const book: string = useParams().search || '';
	const isbn = location.state.isbn;

	const displayName = user?.displayName || '';
	const id = user?.uid || '';
	const photoURL = user?.photoURL || '';

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
				comments,
				book,
				displayName,
				id,
				photoURL,
				isbn,
			});
		} else {
			alert('로그인해주세요');
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
		</>
	);
}
