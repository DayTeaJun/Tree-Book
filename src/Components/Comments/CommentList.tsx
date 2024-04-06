import { useAuthContext } from '../../Context/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useEffect, useState } from 'react';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Paginaition } from '../Pagination/Pagination';
import Loading from '../LoadingSpinner/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentLike } from './CommentLike';
import { Modal } from '../Modal/Modal';
import { M } from '../Modal/modal.style';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getDocuments } from '../../Api/Firebase/getDocuments';

export function CommentList({ isbn }: { isbn: string }) {
	const [comment, setComment] = useState<FirestoreDocument[]>([]);
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('comments');
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [commentUid, setCommentUid] = useState('');
	const [expandedComment, setExpandedComment] = useState<boolean[]>(
		new Array(comment.length).fill(false)
	);
	const { enqueueSnackbar } = useSnackbar();

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['comments', isbn],
		queryFn: () => getDocuments('comments', isbn),
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
			enqueueSnackbar('댓글이 삭제되었습니다.');
		},
		onError: (error) => {
			console.log(error);
			enqueueSnackbar('댓글을 삭제하는데 실패하였습니다.');
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
			<Box
				component='section'
				sx={{
					width: '100%',
					overflow: 'hidden',
					display: 'felx',
					flexDirection: 'column',
					gap: '10px',
					marginTop: '10px',
				}}
			>
				{comment &&
					comment.map((comment, index: number) => (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								borderRadius: '5px',
								padding: '20px 0',
							}}
							key={index}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '10px',
								}}
							>
								<Box sx={{ display: 'flex', gap: '20px' }}>
									<Box
										sx={{
											width: '50px',
											height: '50px',
											border: '50%',
											overflow: 'hidden',
											borderRadius: '50%',
											flexShrink: 0,
										}}
									>
										<img
											src={comment.photoURL}
											alt={`${comment.displayName}의 프로필 사진입니다.`}
										/>
									</Box>

									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											gap: '5px',
										}}
									>
										<Box sx={{ display: 'flex', gap: '20px' }}>
											<Link
												to={`/profile/${comment.displayName}`}
												state={{ id: comment.id }}
											>
												<Typography
													fontSize='1.1em'
													fontWeight='bold'
													sx={{ cursor: 'pointer' }}
													color='text.primary'
												>
													{comment.displayName}
												</Typography>
											</Link>
											<Typography
												component='p'
												fontSize='1.1em'
												fontWeight='bold'
												color='text.secondary'
											>
												{comment.createdTime?.toDate().toLocaleString()}
											</Typography>
										</Box>
										<Typography
											component='p'
											fontSize='1em'
											color='text.primary'
										>
											{expandedComment[index]
												? comment.comments
												: comment.comments && comment.comments.length > 100
												? `${comment.comments?.substring(0, 100)}...`
												: comment.comments}
										</Typography>

										{comment.comments && comment.comments.length > 120 && (
											<Typography
												component='span'
												fontSize='0.8em'
												color='text.secondary'
												sx={{ cursor: 'pointer' }}
												onClick={() => {
													setExpandedComment({
														...expandedComment,
														[index]: !expandedComment[index],
													});
												}}
											>
												{!expandedComment[index] ? '더보기' : '간략히'}
											</Typography>
										)}
										<CommentLike uid={comment.uid} item={comment} />
									</Box>
								</Box>
								{(user && user.uid) !== comment.id ? (
									<Box
										component='button'
										sx={{
											height: '30px',
											padding: '0 20px',
											fontSize: '1em',
											fontWeight: 'bold',
											border: 'none',
											borderRadius: '5px',
											backgroundColor: 'background.book',
											color: 'text.primary',
											flexShrink: 0,
											cursor: 'pointer',
											'&:hover': {
												backgroundColor: 'background.hover',
											},
										}}
										onClick={() => enqueueSnackbar('신고 접수되었습니다!')}
									>
										신고
									</Box>
								) : (
									<Box
										component='button'
										sx={{
											height: '30px',
											padding: '0 20px',
											fontSize: '1em',
											fontWeight: 'bold',
											border: 'none',
											borderRadius: '5px',
											backgroundColor: 'background.book',
											color: 'text.primary',
											flexShrink: 0,
											cursor: 'pointer',
											'&:hover': {
												backgroundColor: 'background.hover',
											},
										}}
										type='button'
										onClick={() => comment.uid && handleDel(comment.uid)}
									>
										삭제
									</Box>
								)}
							</Box>
						</Box>
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
			</Box>
		</>
	);
}
