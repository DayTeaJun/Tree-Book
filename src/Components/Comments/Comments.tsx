import { CommentsForm, CommentsList } from './Comments.style';

export function Comments() {
	return (
		<>
			<CommentsForm>
				<li>
					<form>
						<h4>댓글쓰기</h4>
						<div>
							<label htmlFor='commentInput'>댓글 입력</label>
							<input
								id='commentInput'
								type='text'
								placeholder='댓글 내용을 입력해주세요.'
								name='content'
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
