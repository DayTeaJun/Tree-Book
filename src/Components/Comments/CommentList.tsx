import { useAuthContext } from '../../Context/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { useEffect, useState } from 'react';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Paginaition } from '../Pagination/Pagination';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentLike } from './CommentLike';
import { Modal } from '../Modal/Modal';
import { M } from '../Modal/modal.style';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';

export function CommentList({
	isbn,
	documents,
	comments,
}: {
	isbn: string;
	documents?: FirestoreDocument[];
	comments?: FirestoreDocument[];
}) {
	const [commentData, setCommentData] = useState<FirestoreDocument[]>([]);
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('comment');
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [commentUid, setCommentUid] = useState('');
	const [expandedComment, setExpandedComment] = useState<boolean[]>(
		new Array(commentData.length).fill(false)
	);
	const { enqueueSnackbar } = useSnackbar();

	const commentsPerPage = 4;
	const commentLists =
		comments &&
		comments.sort((a, b) => b.createdTime!.seconds - a.createdTime!.seconds);
	const startIndex = (currentPage - 1) * commentsPerPage;
	const endIndex = startIndex + commentsPerPage;

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		if (commentLists) {
			const displayedComments = commentLists.slice(startIndex, endIndex);
			setCommentData(displayedComments);
		}
	}, [comments, currentPage]);

	const deleteComment = async (uid: string) => {
		if (documents) {
			const commentTotalNumber = documents[0]?.commentTotalNumber ?? 0;

			await setDoc(doc(collection(appFirestore, 'LikedBook'), isbn), {
				...documents[0],
				commentTotalNumber:
					commentTotalNumber <= 0 ? 0 : commentTotalNumber - 1,
			});
			await deleteDocument(uid);
		}
	};

	const mutation = useMutation({
		mutationFn: deleteComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comment'] });
			queryClient.invalidateQueries({ queryKey: ['LikedBook'] });
			enqueueSnackbar('댓글이 삭제되었습니다.', { variant: 'success' });
		},
		onError: (error) => {
			console.log(error);
			enqueueSnackbar('댓글을 삭제하는데 실패하였습니다.', {
				variant: 'error',
			});
		},
	});

	const handleDel = (uid: string) => {
		setIsOpenModal(true);
		setCommentUid(uid);
	};

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
					padding: '20px 0',
				}}
			>
				{commentData &&
					commentData.map((commentData, index: number) => (
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
											src={commentData.photoURL}
											alt={`${commentData.displayName}의 프로필 사진입니다.`}
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
												to={`/profile/${commentData.displayName}`}
												state={{ id: commentData.id }}
											>
												<Typography
													fontSize='1.1em'
													fontWeight='bold'
													sx={{ cursor: 'pointer' }}
													color='text.primary'
												>
													{commentData.displayName}
												</Typography>
											</Link>
											<Typography
												component='p'
												fontSize='1.1em'
												fontWeight='bold'
												color='text.secondary'
											>
												{commentData.createdTime?.toDate().toLocaleString()}
											</Typography>
										</Box>
										<Typography
											component='p'
											fontSize='1em'
											color='text.primary'
										>
											{expandedComment[index]
												? commentData.comments
												: commentData.comments &&
												  commentData.comments.length > 100
												? `${commentData.comments?.substring(0, 100)}...`
												: commentData.comments}
										</Typography>

										{commentData.comments &&
											commentData.comments.length > 120 && (
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
										<CommentLike uid={commentData.uid} item={commentData} />
									</Box>
								</Box>
								{(user && user.uid) !== commentData.id ? (
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
										onClick={() =>
											enqueueSnackbar('신고 접수되었습니다!', {
												variant: 'success',
											})
										}
									>
										신고
									</Box>
								) : (
									<Box sx={{ display: 'flex', gap: '10px' }}>
										<Box
											component='button'
											sx={{
												width: '75px',
												height: '30px',
												padding: '0 20px',
												fontSize: '1em',
												fontWeight: 'bold',
												border: 'none',
												borderRadius: '5px',
												backgroundColor: 'background.book',
												color: 'text.primary',
												cursor: 'pointer',
												'&:hover': {
													backgroundColor: 'background.hover',
												},
											}}
											type='button'
										>
											수정
										</Box>
										<Box
											component='button'
											sx={{
												width: '75px',
												height: '30px',
												fontSize: '1em',
												fontWeight: 'bold',
												border: 'none',
												borderRadius: '5px',
												backgroundColor: 'background.book',
												color: 'text.primary',
												cursor: 'pointer',
												'&:hover': {
													backgroundColor: 'background.hover',
												},
											}}
											type='button'
											onClick={() =>
												commentData.uid && handleDel(commentData.uid)
											}
										>
											삭제
										</Box>
									</Box>
								)}
							</Box>
						</Box>
					))}
				{comments && comments.length > 4 && (
					<Paginaition
						page={currentPage}
						handlePageChange={handlePageChange}
						count={
							commentLists && Math.ceil(commentLists.length / commentsPerPage)
						}
					/>
				)}
				{comments?.length === 0 && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '50px 0',
						}}
					>
						<Typography
							component='p'
							fontSize='1.2em'
							fontWeight='bold'
							sx={{
								color: 'text.secondary',
							}}
						>
							아직 등록된 댓글이 없습니다! 첫번째 댓글을 남겨주세요!
						</Typography>
					</Box>
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
