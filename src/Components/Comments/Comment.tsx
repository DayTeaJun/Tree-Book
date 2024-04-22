import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { CommentForm } from './CommentForm';
import { BookData, BookLikesProps } from '../../Types/bookType';
import Loading from '../LoadingSpinner/Loading';
import { CommentList } from './CommentList';
import { useAuthContext } from '../../Context/useAuthContext';
import { Box, Typography } from '@mui/material';
import { CommentItem } from './CommentItem';
import { FirestoreDocument } from '../../Types/firestoreType';

export const Comment = ({
	item,
	likedBook,
}: {
	item: BookData;
	likedBook: FirestoreDocument[];
}) => {
	const isbn = item.isbn;
	const { user } = useAuthContext();

	const {
		data: commentData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['comment', isbn],
		queryFn: () => getDocuments('comment', isbn),
	});

	return (
		<>
			{commentData?.findIndex(
				(item) => item.displayName === user?.displayName
			) !== -1 ? (
				<>
					<Typography
						fontSize='1.2em'
						fontWeight='bold'
						sx={{ paddingBottom: '10px' }}
					>
						내가 작성한 리뷰
					</Typography>
					{commentData?.map(
						(commentData) =>
							commentData.displayName === user?.displayName && (
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										borderColor: 'background.content',
										borderTop: 'solid 1px',
										borderBottom: 'solid 1px',
										padding: '10px',
									}}
								>
									<CommentItem
										index={0}
										commentData={commentData as FirestoreDocument}
										user={user}
										isbn={isbn}
										documents={likedBook as FirestoreDocument[]}
									/>
								</Box>
							)
					)}
				</>
			) : (
				<CommentForm item={item} likedBook={likedBook} />
			)}
			{!isLoading ? (
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
					<CommentList
						isbn={isbn}
						documents={likedBook}
						comments={commentData}
					/>
				</Box>
			) : (
				<Loading />
			)}
		</>
	);
};
