import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Context/useAuthContext';
import { P } from './Profile.style';
import UserLiked from './UserLiked';
import { ProfileSekeleton } from './Profile.skeleton';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { UserComment } from './UserComment';
import { Box } from '@mui/material';
import { useWithdrawal } from '../../Hook/FirebaseHook/userWithdrawal';
import { useState } from 'react';
import { Modal } from '../../Components/Modal/Modal';
import { M } from '../../Components/Modal/modal.style';

export default function Profile() {
	const { user } = useAuthContext();
	const userId = useParams().userProfile || '';
	const { userProfile } = useParams();
	const { withDrawal } = useWithdrawal();
	const [isOpenModal, setIsOpenModal] = useState(false);

	const {
		data: documents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['user', userProfile],
		queryFn: () => getDocuments('user'),
	});

	if (isLoading) {
		return (
			<P.Main>
				<ProfileSekeleton />
			</P.Main>
		);
	}

	const handleWithDrawal = () => {
		setIsOpenModal(true);
	};

	return (
		<P.Main>
			{userId &&
				documents &&
				documents.map(
					(users) =>
						userId === users.displayName && (
							<P.Section key={users.uid}>
								<P.ContainerProfile>
									<P.ContainerImg>
										<img
											src={
												(userId === (user && user.displayName) &&
													user &&
													user.photoURL) ||
												users.photoURL
											}
											alt={`${users.displayName}의 프로필 사진입니다.`}
										/>
									</P.ContainerImg>
									<P.H1>{users.displayName}</P.H1>
									<P.PP>{users.intro || ''}</P.PP>
									{userId === (user && user.displayName) && (
										<>
											<P.ALink to='./edit' state={{ intro: users.intro }}>
												프로필 수정
											</P.ALink>
											<P.Button
												type='button'
												onClick={() => handleWithDrawal()}
											>
												계정 삭제
											</P.Button>
										</>
									)}
								</P.ContainerProfile>
								<Box
									sx={{
										maxWidth: 'calc(70% - 160px)',
										display: 'flex',
										flexDirection: 'column',
										gap: '30px',
									}}
								>
									<UserLiked uid={users.uid} />
									<UserComment
										uid={users.uid}
										displayName={users.displayName}
									/>
								</Box>
							</P.Section>
						)
				)}

			{isOpenModal && (
				<Modal
					setIsOpenModal={setIsOpenModal}
					isOpen={isOpenModal}
					promise={withDrawal}
				>
					<M.H2>정말로 계정을 삭제하시겠습니까?</M.H2>
					<M.P>계정을 삭제하면 복구할 수 없습니다.</M.P>
					<M.P>(등록한 댓글 및 좋아요 기록은 자동으로 삭제되지 않습니다.)</M.P>
				</Modal>
			)}
		</P.Main>
	);
}
