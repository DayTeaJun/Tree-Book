import { useNavigate, useParams } from 'react-router-dom';
import UserLiked from './UserLiked';
import { useQuery } from '@tanstack/react-query';
import { UserComment } from './UserComment';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getUser } from '../../Api/Firebase/getUser';
import { H1, Shimmer } from '../../Styles/Common';
import { enqueueSnackbar } from 'notistack';
import { UserLikedSkeleton } from './UserLiked.skeleton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Chart } from '../../Components/Rating/Chart';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

export default function Profile() {
	const { user } = useSelector((state: RootState) => state.user);
	const userId = useParams().userProfile || '';
	const { userProfile } = useParams();
	const navigate = useNavigate();
	const { isDownMD } = useMediaQueries();

	const {
		data: userDocument,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['user', userProfile],
		queryFn: () => getUser('user', userProfile ?? ''),
	});

	if (!isLoading && userDocument == undefined) {
		enqueueSnackbar('존재하지 않는 프로필입니다!', { variant: 'error' });
		navigate('/');
	}

	return (
		<>
			<Helmet>
				<title>
					{`${userDocument && userDocument.displayName}님의 프로필 - TreeBook`}
				</title>
			</Helmet>
			<H1>{userDocument && userDocument.displayName}님의 프로필 페이지</H1>
			<Box
				component='main'
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					gap: '10px',
					border: '2px solid',
					borderColor: 'background.content',
					borderRadius: '15px',
				}}
			>
				<Box
					component='section'
					sx={{
						width: '100%',
						display: 'flex',
						gap: '10px',
					}}
				>
					<Box
						component='section'
						sx={{
							width: `${isDownMD ? '50%' : '30%'}`,
							minHeight: '255px',
							padding: '10px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'background.content',
							gap: '5px',
							borderRadius: '5px',
							position: 'relative',
							borderColor: 'background.content',
						}}
					>
						<Box
							sx={{
								width: '120px',
								height: '120px',
								borderRadius: '50%',
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
							<Typography component='h2' fontSize='1.3em' fontWeight='bold'>
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
							<Typography component='p' fontSize='1em' color='text.secondary'>
								{userDocument && userDocument.email}
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
							<Typography component='p' fontSize='1em' color='text.secondary'>
								{(userDocument && userDocument?.intro) ||
									'한줄 자기소개를 작성해보세요.'}
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
										<Box
											sx={{
												position: 'absolute',
												top: '10px',
												right: '10px',
												color: 'text.primary',
											}}
										>
											<SettingsIcon fontSize='large' />
										</Box>
									</Link>
								</>
							)
						)}
					</Box>
					<Box
						component='section'
						sx={{
							width: '50%',
							height: '265px',
							display: 'flex',
							flexDirection: 'column',
							margin: '0 auto',
							padding: '20px',
						}}
					>
						{isLoading ? (
							<Box
								sx={{
									width: '100%',
									height: '100%',
									overflow: 'hidden',
								}}
							>
								<Shimmer />
							</Box>
						) : !isLoading && userDocument?.ratingBook ? (
							<>
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
										marginBottom: '10px',
										borderRadius: '5px',
									}}
								>
									{`별점분포`}
								</Typography>
								<Chart chartRating={userDocument.ratingBook} props='profile' />
							</>
						) : (
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									margin: '0 auto',
								}}
							>
								<Typography component='p'>
									아직 작성한 리뷰 별점이 없습니다.
								</Typography>
							</Box>
						)}
					</Box>
				</Box>

				{!isLoading && userDocument ? (
					<>
						<UserLiked
							uid={userDocument.uid}
							displayName={userDocument.displayName}
						/>
						<UserComment
							uid={userDocument.uid}
							displayName={userDocument && userDocument.displayName}
						/>
					</>
				) : (
					<>
						<UserLikedSkeleton />
						<UserLikedSkeleton comment={'comment'} />
					</>
				)}
			</Box>
		</>
	);
}
