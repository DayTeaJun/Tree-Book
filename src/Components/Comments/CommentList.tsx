import { useAuthContext } from '../../Context/useAuthContext';
import { Fragment, useEffect, useState } from 'react';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Paginaition } from '../Pagination/Pagination';
import { Box, Typography } from '@mui/material';
import { CommentItem } from './CommentItem';

export function CommentList({
	isbn,
	documents,
	comments,
	sorted,
}: {
	isbn: string;
	documents?: FirestoreDocument[];
	comments?: FirestoreDocument[];
	sorted: string;
}) {
	const [commentData, setCommentData] = useState<FirestoreDocument[]>([]);
	const { user } = useAuthContext();
	const [currentPage, setCurrentPage] = useState(1);
	const commentsPerPage = 4;

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		let commentLists;
		const startIndex = (currentPage - 1) * commentsPerPage;
		const endIndex = startIndex + commentsPerPage;
		if (sorted === 'latest') {
			commentLists =
				comments &&
				comments.sort(
					(a, b) => b.createdTime!.seconds - a.createdTime!.seconds
				);
			const displayedComments = commentLists!.slice(startIndex, endIndex);
			setCommentData(displayedComments);
		} else if (sorted === 'popular') {
			commentLists =
				comments &&
				comments.sort(
					(a, b) =>
						Object.keys(b.likeBy as object).length -
						Object.keys(a.likeBy as object).length
				);
			const displayedComments = commentLists!.slice(startIndex, endIndex);
			setCommentData(displayedComments);
			console.log('dk');
		}
	}, [comments, currentPage, sorted]);

	return (
		<>
			{commentData &&
				commentData.map(
					(commentData, index: number) =>
						commentData.displayName !== user?.displayName &&
						documents && (
							<Fragment key={index}>
								<CommentItem
									index={index}
									commentData={commentData}
									user={user}
									isbn={isbn}
									documents={documents}
								/>
							</Fragment>
						)
				)}
			{comments && comments.length > 4 && (
				<Paginaition
					page={currentPage}
					handlePageChange={handlePageChange}
					count={comments && Math.ceil(comments.length / commentsPerPage)}
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
		</>
	);
}
