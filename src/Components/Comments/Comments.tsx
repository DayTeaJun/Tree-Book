import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import {
	CommentDate,
	CommentsForm,
	CommentsList,
	DelOrReport,
	FlexImgBtn,
	FlexImgLink,
	FlexNameComment,
	FlexNameDate,
	ProfileImg,
} from './Comments.style';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function Comments() {
	const [comments, setComments] = useState('');
	const { addDocument, response } = useFirestore('comments');
	const { documents, error } = useCollection('comments');
	const { deleteDocument } = useFirestore('comments');

	const book: string = useParams().bookDetail || '';
	const { user } = useAuthContext();
	const displayName = user?.displayName || '';
	const id = user?.uid || '';
	const photoURL = user?.photoURL || '';

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		setComments(e.target.value);
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (user) {
			addDocument({
				comments,
				book,
				displayName,
				id,
				photoURL,
			});
		} else {
			alert('로그인해주세요');
		}
	};

	console.log(documents);

	useEffect(() => {
		if (response.success) {
			setComments('');
		}
	}, [response.success]);

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
			{documents &&
				documents.map(
					(comment) =>
						comment.book === book && (
							<CommentsList key={comment.uid}>
								<div>
									<FlexImgBtn>
										<FlexImgLink>
											<ProfileImg
												src={comment.photoURL}
												alt={`${comment.displayName}의 프로필 사진입니다.`}
											/>

											<FlexNameComment>
												<FlexNameDate>
													{user && user.uid === comment.id ? (
														<Link to={`/profile`}>{comment.displayName}</Link>
													) : (
														<Link
															to={`/profile/${comment.displayName}`}
															state={{ id: comment.id }}
														>
															{comment.displayName}
														</Link>
													)}
													<CommentDate>{comment.createdTime}</CommentDate>
												</FlexNameDate>
												<p>{comment.comments}</p>
											</FlexNameComment>
										</FlexImgLink>
										{(user && user.uid) !== comment.id ? (
											<DelOrReport type='button'>신고</DelOrReport>
										) : (
											<DelOrReport
												type='button'
												onClick={() => deleteDocument(comment.uid!)}
											>
												삭제
											</DelOrReport>
										)}
									</FlexImgBtn>
								</div>
							</CommentsList>
						)
				)}
		</>
	);
}
