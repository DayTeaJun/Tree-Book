import { Fragment, RefObject, useEffect, useState } from 'react';
import { FirestoreDocument } from '../../../Types/firestoreType';
import { CustomPaginaition } from '../../../Components/Pagination/Pagination';
import { Box, Typography } from '@mui/material';
import { CommentItem } from './CommentItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

export function CommentList({
	isbn,
	documents,
	comments,
	sorted,
	menuRef,
}: {
	isbn: string;
	documents: FirestoreDocument[];
	comments: FirestoreDocument[];
	sorted: string;
	menuRef: RefObject<HTMLDivElement> | null;
}) {
	const [commentData, setCommentData] = useState<FirestoreDocument[]>([]);
	const { user } = useSelector((state: RootState) => state.user);
	const [currentPage, setCurrentPage] = useState(1);
	const commentsPerPage = 5;
	const commentLength =
		comments?.findIndex((item) => item.displayName === user?.displayName) !== -1
			? comments?.length - 1
			: comments?.length;

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		let commentLists;
		const startIndex = (currentPage - 1) * commentsPerPage;
		const endIndex = startIndex + commentsPerPage;
		if (comments)
			if (sorted === 'latest') {
				commentLists = comments.sort((a, b) => {
					const secondA = a.createdTime ? a.createdTime.seconds : 0;
					const secondB = b.createdTime ? b.createdTime.seconds : 0;
					return secondB - secondA;
				});
			} else if (sorted === 'popular') {
				commentLists = comments.sort((a, b) => {
					const likeByA = a.likeBy ? Object.keys(a.likeBy).length : 0;
					const likeByB = b.likeBy ? Object.keys(b.likeBy).length : 0;
					return likeByB - likeByA;
				});
			} else if (sorted === 'rating') {
				commentLists = comments.sort((a, b) => {
					const ratingA = a.rating ? a.rating : 0;
					const ratingB = b.rating ? b.rating : 0;
					return ratingB - ratingA;
				});
			}
		const displayedComments =
			commentLists && commentLists.slice(startIndex, endIndex);
		if (displayedComments) {
			setCommentData(displayedComments);
		}
	}, [currentPage, sorted]);

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
			{comments && commentLength > 5 && (
				<CustomPaginaition
					menuRef={menuRef}
					page={currentPage}
					handlePageChange={handlePageChange}
					count={comments && Math.ceil(commentLength / commentsPerPage)}
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
