import { useAuthContext } from '../../Context/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { CL } from './CommentList.style';
import { useEffect, useState } from 'react';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Paginaition } from '../Pagination/Pagination';
import { Loading } from '../LoadingSpinner/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';

export function CommentList({ isbn }: { isbn: string }) {
	const [comment, setComment] = useState<FirestoreDocument[]>([]);
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('comments');
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['comments'],
		queryFn: () => getDocuments('comments'),
	});

	const commentsPerPage = 4;
	const commentLists =
		documents && documents.result.filter((comment) => comment.isbn === isbn);
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

	const mutaion = useMutation({
		mutationFn: deleteDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comments'] });
		},
		onError: () => {
			console.log('Error');
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<CL.Section>
				{comment &&
					comment.map((comment) => (
						<CL.Wrapper key={comment.uid}>
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
											<CL.PDate>{comment.createdTime}</CL.PDate>
										</CL.ContainerNameDate>
										<CL.PComment>{comment.comments}</CL.PComment>
									</CL.ContainerNameComment>
								</CL.ContainerImgLink>
								{(user && user.uid) !== comment.id ? (
									<CL.Button type='button'>신고</CL.Button>
								) : (
									<CL.Button
										type='button'
										onClick={() => comment.uid && mutaion.mutate(comment.uid)}
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
			</CL.Section>
		</>
	);
}
