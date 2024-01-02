import { CommentsStyle } from './Comments.style';

export function Comments() {
	return (
		<CommentsStyle>
			<ul>
				<li>
					<form>
						<h4>댓글쓰기</h4>
						<div>
							<input
								type='text'
								placeholder='댓글 내용을 입력해주세요.'
								name='content'
							/>

							<button type='submit'>등록</button>
						</div>
					</form>
				</li>
				<li></li>
			</ul>
		</CommentsStyle>
	);
}
