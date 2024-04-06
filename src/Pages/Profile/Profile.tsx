import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Context/useAuthContext';
import UserLiked from './UserLiked';
import { useQuery } from '@tanstack/react-query';
import { UserComment } from './UserComment';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getUser } from '../../Api/Firebase/getUser';
import { Shimmer } from '../../Styles/Common';

export default function Profile() {
	const { user } = useAuthContext();
	const userId = useParams().userProfile || '';
	const { userProfile } = useParams();

	const {
		data: userDocument,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['user', userProfile],
		queryFn: () => getUser('user', userProfile ?? ''),
	});

	return (
		<>
			<Helmet>
				<title>
					{`${userDocument && userDocument.displayName}님의 프로필 - TreeBook`}
				</title>
			</Helmet>
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
				<Box
					component='section'
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						overflow: 'hidden',
						gap: '20px',
					}}
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
							{isLoading ? (
								<Shimmer />
							) : (
								userDocument && (
									<img
										src={
											(userId === (user && user.displayName) &&
												user &&
												user.photoURL) ||
											userDocument.photoURL
										}
										alt={`${userDocument.displayName}의 프로필 사진입니다.`}
									/>
								)
							)}
						</Box>
						{isLoading ? (
							<Box
								sx={{
									width: '200px',
									height: '16px',
									overflow: 'hidden',
								}}
							>
								<Shimmer />
							</Box>
						) : (
							<Typography component='h2' fontSize='1.5em' fontWeight='bold'>
								{userDocument && userDocument?.displayName}
							</Typography>
						)}
						{isLoading ? (
							<Box
								sx={{
									width: '200px',
									height: '36px',
									overflow: 'hidden',
								}}
							>
								<Shimmer />
							</Box>
						) : (
							<Typography component='p' fontSize='1em' textAlign='center'>
								{(userDocument && userDocument?.intro) || ''}
							</Typography>
						)}
						{isLoading ? (
							<Box
								sx={{
									width: '200px',
									height: '36px',
									overflow: 'hidden',
								}}
							>
								<Shimmer />
							</Box>
						) : (
							userDocument &&
							userId === (user && user.displayName) && (
								<>
									<Link to='./edit' state={{ intro: userDocument.intro }}>
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
												'&:hover': {
													backgroundColor: 'background.hover',
												},
											}}
										>
											프로필 수정
										</Typography>
									</Link>
								</>
							)
						)}
					</Box>
					<Box
						sx={{
							width: 'calc(70% - 160px)',
							minHeight: '570px',
							display: 'flex',
							flexDirection: 'column',
							gap: '30px',
						}}
					>
						{userDocument && (
							<>
								<UserLiked uid={userDocument && userDocument.uid} />
								<UserComment
									uid={userDocument && userDocument.uid}
									displayName={userDocument && userDocument.displayName}
								/>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
}
