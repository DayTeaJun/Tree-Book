import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { useFirestore } from '../../Hook/FirebaseHook/useFirestore';
import { CL } from './CommentList.style';
import { useEffect, useState } from 'react';
import { FirestoreDocument } from '../../Types/firestoreType';
import { Paginaition } from '../Pagination/Pagination';
import { Loading } from '../LoadingSpinner/Loading';
import { BookData } from '../../Types/bookType';
import { useQuery } from '@tanstack/react-query';

export function CommentList({ isbn }: { isbn: string }) {
	const [comment, setComment] = useState([]);
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('comments');
	const [currentPage, setCurrentPage] = useState(1);
	console.log(useCollection('comment'));

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['documents'],
		queryFn: () => useCollection('comments'),
	});
	console.log(documents);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		if (documents) {
			const commentsPerPage = 4;
			const startIndex = (currentPage - 1) * commentsPerPage;
			const endIndex = startIndex + commentsPerPage;
			const displayedComments = documents.result.slice(startIndex, endIndex);
			console.log(displayedComments, '1');
		}
	}, [documents, currentPage]);

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
										onClick={() => deleteDocument(comment.uid!)}
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
