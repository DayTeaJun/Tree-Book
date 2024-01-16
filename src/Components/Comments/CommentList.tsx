import { useParams } from 'react-router-dom';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { CL } from './CommentList.style';

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
							<CL.Wrapper key={comment.uid}>
								<CL.ContainerImgBtn>
									<CL.ContainerImgLink>
										<CL.Img
											src={comment.photoURL}
											alt={`${comment.displayName}의 프로필 사진입니다.`}
										/>

										<CL.ContainerNameComment>
											<CL.ContainerNameDate>
												{user && user.uid === comment.id ? (
													<CL.ALink to={`/profile`}>
														{comment.displayName}
													</CL.ALink>
												) : (
													<CL.ALink
														to={`/profile/${comment.displayName}`}
														state={{ id: comment.id }}
													>
														{comment.displayName}
													</CL.ALink>
												)}
												<CL.PDate>{comment.createdTime}</CL.PDate>
											</CL.ContainerNameDate>
											<CL.PComment>{comment.comments}</CL.PComment>
										</CL.ContainerNameComment>
									</CL.ContainerImgLink>
									{(user && user.uid) !== comment.id ? (
										<CL.Button type='button'>신고</CL.Button>
									) : (
										<CL.Button
											type='button'
											onClick={() => deleteDocument(comment.uid!)}
										>
											삭제
										</CL.Button>
									)}
								</CL.ContainerImgBtn>
							</CL.Wrapper>
						)
				)}
		</>
	);
}
