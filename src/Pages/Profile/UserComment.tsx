import { UserLikedProps } from '../../Types/userType';
import BookItem from '../../Components/Books/BookItem';
import { BookData } from '../../Types/bookType';
import { Box, Typography } from '@mui/material';
import { useGetProfileCommentQuery } from '../../Hook/QueryHook/getUserQuery';

export const UserComment = ({ uid }: UserLikedProps) => {
	const { data: userBooks } = useGetProfileCommentQuery(uid);

	return (
		<>
			{userBooks && (
				<Box
					component='section'
					sx={{
						width: '100%',
						minHeight: '350px',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						backgroundColor: 'background.content',
						borderRadius: '5px',
						padding: '10px',
					}}
				>
					<Typography
						component='p'
						fontSize='1.1em'
						fontWeight='bold'
						color='text.primary'
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						작성한 코멘트 목록
					</Typography>
					<Box
						component='ul'
						sx={{
							width: '100%',
							height: '289px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '10px',
							overflowY: 'auto',
							overflowX: 'hidden',
							'&::-webkit-scrollbar': {
								width: '10px',
								borderRadius: '6px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: 'background.hover',
								borderRadius: '6px',
							},
						}}
					>
						{userBooks.length !== 0 ? (
							(userBooks as BookData[]).map((item: BookData, index: number) => (
								<BookItem
									item={item}
									page={item.page}
									id={item.id}
									search={item.search}
									key={index}
									like={item.isbn}
									comment={item.comments}
								></BookItem>
							))
						) : (
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									margin: '0 auto',
								}}
							>
								<Typography component='p'>
									아직 작성한 코멘트가 없습니다.
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};
