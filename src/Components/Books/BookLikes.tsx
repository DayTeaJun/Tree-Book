import { BookLikesProps } from '../../Types/bookType';
import { useAuthContext } from '../../Context/useAuthContext';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { timestamp } from '../../Firebase/config';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BookLikes = ({ item, id, search, page }: BookLikesProps) => {
	const { user } = useAuthContext();
	const isbn = item.isbn;
	const { likeBy }: any = item;
	const likedUser = user ? likeBy && likeBy[user!.uid] === true : false;
	const [like, setLike] = useState<boolean | undefined>(likedUser);
	const [number, setNumber] = useState<number | undefined>();
	const queryClient = useQueryClient();
	const { addDocument, deleteDocument } = useFirestore('LikedBook', isbn);
	const { enqueueSnackbar } = useSnackbar();

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['LikedBook', isbn],
		queryFn: () => getDocuments('LikedBook', isbn),
	});

	useEffect(() => {
		if (documents) {
			const likedUser = documents.find((book) => book.isbn === isbn);
			if (likedUser) {
				const likedNumber = likedUser?.likeBy
					? Object.values(likedUser.likeBy).filter((like) => like === true)
							.length
					: 0;
				setNumber(likedNumber);
				if (user) {
					const isUser =
						likedUser.likeBy &&
						likedUser.likeBy[user.uid as keyof typeof likedUser.likeBy] ===
							true;
					setLike(isUser);
				}
			} else {
				setLike(false);
				setNumber(0);
			}
		}
	}, [documents]);

	const handleLikes = async () => {
		if (user && documents) {
			const likedUser = documents.find((book) => book.isbn === isbn);
			const uid = user.uid;
			let likeBy;
			const createdTime = timestamp.fromDate(new Date());
			if (!like) {
				likeBy = { ...likedUser?.likeBy, [uid]: !like };
				addMutation.mutate({
					...item,
					createdTime,
					likeBy,
					id,
					search,
					page,
				});
				if (number !== undefined) {
					setNumber(number + 1);
					enqueueSnackbar('즐겨찾기가 등록되었습니다.', { variant: 'success' });
				}
			} else {
				likeBy = { ...likedUser?.likeBy };
				delete likeBy[uid];
				if (Object.keys(likeBy).length === 0) {
					delMutation.mutate(isbn);
				} else {
					addMutation.mutate({
						...item,
						createdTime,
						likeBy,
						id,
						search,
						page,
					});
				}
				if (number) {
					setNumber(number - 1);
					enqueueSnackbar('즐겨찾기가 취소되었습니다.', { variant: 'success' });
				}
			}
		} else {
			enqueueSnackbar('로그인이 필요합니다!', { variant: 'error' });
		}
	};

	const addMutation = useMutation({
		mutationFn: addDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['LikedBook'] });
		},
		onError: (error) => {
			enqueueSnackbar('즐겨찾기가 오류로 인해 실패하였습니다.', {
				variant: 'error',
			});
			console.log(error);
		},
	});

	const delMutation = useMutation({
		mutationFn: deleteDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['LikedBook'] });
		},
		onError: (error) => {
			enqueueSnackbar('즐겨찾기 취소가 오류로 인해 실패하였습니다.', {
				variant: 'error',
			});
			console.log(error);
		},
	});

	return (
		<>
			{documents && (
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						color: 'background.mark',
						cursor: 'pointer',
					}}
					onClick={() => handleLikes()}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{!like ? (
							<BookmarkBorderIcon fontSize='large' />
						) : (
							<BookmarkIcon fontSize='large' />
						)}
						{number !== 0 && number && (
							<Typography component='p' fontSize='1em' fontWeight='bold'>
								{number} 명
							</Typography>
						)}
					</Box>
					<Typography
						component='p'
						fontSize='1em'
						fontWeight='bold'
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '5px',
						}}
					>
						<VisibilityIcon />
						{documents && documents.length > 0 ? documents[0].views : null}
					</Typography>
				</Box>
			)}
		</>
	);
};

export default BookLikes;
