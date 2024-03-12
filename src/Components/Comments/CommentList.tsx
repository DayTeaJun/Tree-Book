import { useAuthContext } from '../../Context/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { CL } from './CommentList.style';
import { useEffect, useState } from 'react';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Paginaition } from '../Pagination/Pagination';
import { Loading } from '../LoadingSpinner/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentLike } from './CommentLike';
import { getComments } from '../../Api/Firebase/getComments';
import { Modal } from '../Modal/Modal';
import { M } from '../Modal/modal.style';
import ToastPopup from '../Toast/Toast';

export function CommentList({ isbn }: { isbn: string }) {
	const [comment, setComment] = useState<FirestoreDocument[]>([]);
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('comments');
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [commentUid, setCommentUid] = useState('');

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['comments', isbn],
		queryFn: () => getComments('comments', isbn),
	});

	const commentsPerPage = 4;
	const commentLists =
		documents &&
		documents.sort((a, b) => b.createdTime!.seconds - a.createdTime!.seconds);
	const startIndex = (currentPage - 1) * commentsPerPage;
	const endIndex = startIndex + commentsPerPage;

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		if (commentLists) {
			const displayedComments = commentLists.slice(startIndex, endIndex);
			setComment(displayedComments);
		}
	}, [documents, currentPage]);

	const mutation = useMutation({
		mutationFn: deleteDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comments'] });
		},
		onError: () => {
			console.log('Error');
		},
	});

	const handleDel = (uid: string) => {
		setIsOpenModal(true);
		setCommentUid(uid);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<CL.Section>
				{comment &&
					comment.map((comment, index: number) => (
						<CL.Wrapper key={index}>
							<CL.ContainerImgBtn>
								<CL.ContainerImgLink>
									<CL.ContainerImg>
										<img
											src={comment.photoURL}
											alt={`${comment.displayName}의 프로필 사진입니다.`}
										/>
									</CL.ContainerImg>

									<CL.ContainerNameComment>
										<CL.ContainerNameDate>
											<CL.ALink
												to={`/profile/${comment.displayName}`}
												state={{ id: comment.id }}
											>
												{comment.displayName}
											</CL.ALink>
											<CL.PDate>
												{comment.createdTime?.toDate().toLocaleString()}
											</CL.PDate>
										</CL.ContainerNameDate>
										<CL.PComment>{comment.comments}</CL.PComment>
										<CommentLike uid={comment.uid} item={comment} />
									</CL.ContainerNameComment>
								</CL.ContainerImgLink>
								{(user && user.uid) !== comment.id ? (
									<CL.Button type='button'>신고</CL.Button>
								) : (
									<CL.Button
										type='button'
										onClick={() => comment.uid && handleDel(comment.uid)}
									>
										삭제
									</CL.Button>
								)}
							</CL.ContainerImgBtn>
						</CL.Wrapper>
					))}
				{comment.length !== 0 && (
					<Paginaition
						page={currentPage}
						handlePageChange={handlePageChange}
						count={
							commentLists && Math.ceil(commentLists.length / commentsPerPage)
						}
					/>
				)}
				{isOpenModal && (
					<Modal
						setIsOpenModal={setIsOpenModal}
						isOpen={isOpenModal}
						mutationFn={() => mutation.mutate(commentUid)}
					>
						<M.H2>작성하신 댓글을 삭제하시겠습니까?</M.H2>
					</Modal>
				)}
			</CL.Section>
		</>
	);
}
