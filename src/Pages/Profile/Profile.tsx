import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Context/useAuthContext';
import UserLiked from './UserLiked';
import { ProfileSekeleton } from './Profile.skeleton';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';
import { UserComment } from './UserComment';
import { Box, Typography } from '@mui/material';
import { useWithdrawal } from '../../Hook/FirebaseHook/userWithdrawal';
import { useState } from 'react';
import { Modal } from '../../Components/Modal/Modal';
import { M } from '../../Components/Modal/modal.style';
import { Link } from 'react-router-dom';

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
			<Box
				component='main'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '20px 24px',
					marginTop: '20px',
					minHeight: '450px',
					gap: '10px',
				}}
			>
				<ProfileSekeleton />
			</Box>
		);
	}

	const handleWithDrawal = () => {
		setIsOpenModal(true);
	};

	return (
		<Box
			component='main'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '20px 24px',
				marginTop: '20px',
				minHeight: '450px',
				gap: '10px',
			}}
		>
			{userId &&
				documents &&
				documents.map(
					(users) =>
						userId === users.displayName && (
							<Box
								component='section'
								sx={{
									width: '100%',
									height: '100%',
									display: 'flex',
									overflow: 'hidden',
									gap: '20px',
								}}
								key={users.uid}
							>
								<Box
									sx={{
										minWidth: '30%',
										minHeight: '286px',
										flexShrink: 1,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '20px',
										borderRight: '1px solid #ccc',
									}}
								>
									<Box
										sx={{
											width: '200px',
											height: '200px',
											borderRadius: '1em',
											border: 'solid 1px #ccc',
											flexShrink: 1,
											overflow: 'hidden',
										}}
									>
										<img
											src={
												(userId === (user && user.displayName) &&
													user &&
													user.photoURL) ||
												users.photoURL
											}
											alt={`${users.displayName}의 프로필 사진입니다.`}
										/>
									</Box>
									<Typography component='h2' fontSize='1.5em' fontWeight='bold'>
										{users.displayName}
									</Typography>
									<Typography component='p' fontSize='1em' textAlign='center'>
										{users.intro || ''}
									</Typography>
									{userId === (user && user.displayName) && (
										<>
											<Link to='./edit' state={{ intro: users.intro }}>
												<Typography
													component='p'
													fontSize='1em'
													textAlign='center'
													fontWeight='700'
													color='text.primary'
													sx={{
														width: '100%',
														padding: '10px 20px',
														borderRadius: '10px',
														backgroundColor: 'background.book',
														transitionDuration: '0.5s',
														'&:hover': {
															backgroundColor: 'background.hover',
														},
													}}
												>
													프로필 수정
												</Typography>
											</Link>
											<Box
												component='button'
												sx={{
													width: '90%',
													padding: '8px 20px',
													fontSize: '1em',
													fontWeight: 'bold',
													borderRadius: '10px',
													border: 'none',
													cursor: 'pointer',
													color: 'text.primary',
													backgroundColor: 'background.book',
													transitionDuration: '0.5s',
													'&:hover': {
														backgroundColor: 'background.hover',
													},
												}}
												type='button'
												onClick={() => handleWithDrawal()}
											>
												계정 삭제
											</Box>
										</>
									)}
								</Box>
								<Box
									sx={{
										width: 'calc(70% - 160px)',
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
							</Box>
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
		</Box>
	);
}
