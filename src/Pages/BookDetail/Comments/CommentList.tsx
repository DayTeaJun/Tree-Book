import { useAuthContext } from '../../../Context/useAuthContext';
import { Fragment, useEffect, useState } from 'react';
import { FirestoreDocument } from '../../../Types/firestoreType';
import { Paginaition } from '../../../Components/Pagination/Pagination';
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
	const commentsPerPage = 5;

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		let commentLists;
		const startIndex = (currentPage - 1) * commentsPerPage;
		const endIndex = startIndex + commentsPerPage;
		if (comments)
			if (sorted === 'latest') {
				commentLists = comments.sort(
					(a, b) => b.createdTime!.seconds - a.createdTime!.seconds
				);
			} else if (sorted === 'popular') {
				commentLists = comments.sort((a, b) => {
					const likeByA = a.likeBy ? Object.keys(a.likeBy).length : 0;
					const likeByB = b.likeBy ? Object.keys(b.likeBy).length : 0;
					return likeByB - likeByA;
				});
			}
		const displayedComments =
			commentLists && commentLists.slice(startIndex, endIndex);
		if (displayedComments) {
			setCommentData(displayedComments);
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
			{comments && comments.length > 5 && (
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
						아직 등록된 리뷰가 없습니다! 첫번째 리뷰를 남겨주세요!
					</Typography>
				</Box>
			)}
			{commentData?.findIndex(
				(item) => item.displayName === user?.displayName
			) !== -1 &&
				comments?.length === 1 && (
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
							다른 유저의 등록된 리뷰가 아직 없습니다!
						</Typography>
					</Box>
				)}
		</>
	);
}
