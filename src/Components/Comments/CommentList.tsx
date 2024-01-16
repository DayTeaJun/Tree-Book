import { useParams } from 'react-router-dom';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import {
	CommentDate,
	CommentsList,
	DelOrReport,
	FlexImgBtn,
	FlexImgLink,
	FlexNameComment,
	FlexNameDate,
	ProfileImg,
} from './CommentForm.style';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';

export function CommentList() {
	const { documents, error } = useCollection('comments');
	const book: string = useParams().bookDetail || '';
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('comments');
	console.log(documents);

	return (
		<>
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
