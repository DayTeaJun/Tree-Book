import { ChangeEvent, FormEventHandler, useState } from 'react';
import { CommentsForm, CommentsList } from './Comments.style';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';

interface CommentsProps {
	uid: string;
}
export function Comments({ uid }: CommentsProps) {
	const [comments, setComments] = useState('');
	const { addDocument, response } = useFirestore('comments');

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		setComments(e.target.value);
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		addDocument({
			uid,
			comments,
		});
	};

	return (
		<>
			<CommentsForm>
				<li>
					<form onSubmit={handleSubmit}>
						<h4>댓글쓰기</h4>
						<div>
							<label htmlFor='commentInput'>댓글 입력</label>
							<input
								id='commentInput'
								type='text'
								placeholder='댓글 내용을 입력해주세요.'
								name='content'
								value={comments}
								onChange={handleData}
							/>

							<button type='submit'>등록</button>
						</div>
					</form>
				</li>
				<li></li>
			</CommentsForm>

			<CommentsList>
				<div>
					<strong>닉네임</strong>
					<p>날짜</p>
				</div>
				<p>코멘트</p>
			</CommentsList>
		</>
	);
}
