import { CommentForm } from './CommentForm';
import { BookData } from '../../../Types/bookType';
import { CommentList } from './CommentList';
import { Box, Typography } from '@mui/material';
import { CommentItem } from './CommentItem';
import { FirestoreDocument } from '../../../Types/firestoreType';
import { useRef, useState } from 'react';
import { DropdownMenu } from '../../../Components/Dropdown/DropdownMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { useCommentList } from '../../../Hook/QueryHook/getCommentQuery';

export const Comment = ({
	item,
	likedBook,
}: {
	item: BookData;
	likedBook: FirestoreDocument[];
}) => {
	const isbn = item.isbn;
	const { user } = useSelector((state: RootState) => state.user);
	const [isCommentEdit, setIsCommentEdit] = useState(false);
	const [isDropdown, setIsDropdown] = useState(false);
	const [sorted, setSorted] = useState<string>('latest');
	const menuRef = useRef<HTMLDivElement>(null);

	const { data: commentData } = useCommentList(isbn);

	return (
		<>
			{commentData?.findIndex(
				(item) => item.displayName === user?.displayName
			) !== -1 ? (
				<>
					{commentData?.map(
						(commentData, index) =>
							commentData.displayName === user?.displayName && (
								<Box
									component='section'
									sx={{ minHeight: '250px' }}
									key={index}
								>
									<Typography
										fontSize='1.2em'
										fontWeight='bold'
										sx={{ paddingBottom: '10px' }}
									>
										{!isCommentEdit ? '내가 작성한 리뷰' : '리뷰 수정'}
									</Typography>
									{!isCommentEdit ? (
										<>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													padding: '10px',
													borderRadius: '10px',
													border: '1px solid',
												}}
												key={index}
											>
												<CommentItem
													index={0}
													commentData={commentData as FirestoreDocument}
													user={user}
													isbn={isbn}
													documents={likedBook as FirestoreDocument[]}
													setIsCommentEdit={setIsCommentEdit}
												/>
											</Box>
										</>
									) : (
										commentData && (
											<CommentForm
												item={item}
												likedBook={likedBook}
												preComment={commentData as FirestoreDocument}
												setIsCommentEdit={setIsCommentEdit}
											/>
										)
									)}
								</Box>
							)
					)}
				</>
			) : (
				<CommentForm item={item} likedBook={likedBook} />
			)}

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
				ref={menuRef}
			>
				<Box
					sx={{
						borderColor: 'background.content',
						borderBottom: '1px solid',
						display: 'flex',
						paddingBottom: '10px',
						gap: '10px',
					}}
				>
					<Typography component='h2' fontSize='1.2em' fontWeight='bold'>
						리뷰{' '}
						{likedBook && likedBook[0]?.ratingBy
							? `${Object.keys(likedBook[0]?.ratingBy).length}개`
							: null}
					</Typography>
					<DropdownMenu
						isDropdown={isDropdown}
						setIsDropdown={setIsDropdown}
						setSorted={setSorted}
					/>
				</Box>
				<Box component='ul'>
					{commentData && (
						<CommentList
							isbn={isbn}
							documents={likedBook}
							comments={commentData}
							sorted={sorted}
							menuRef={menuRef}
						/>
					)}
				</Box>
			</Box>
		</>
	);
};
