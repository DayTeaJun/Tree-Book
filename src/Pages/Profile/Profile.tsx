import { useLocation, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { P } from './Profile.style';
import persImg from '../../Assets/No-img.svg';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import UserLiked from './UserLiked';
import { Loading } from '../../Components/LoadingSpinner/Loading';
import { ProfileSekeleton } from './Profile.skeleton';

export function Profile() {
	const { user } = useAuthContext();
	const { documents, error, isLoading } = useCollection('user');
	const userId = useParams().userProfile || '';
	const location = useLocation();
	const uid = location.state ? location.state.id : user?.uid;

	if (isLoading) {
		return <Loading />;
	}

	return (
		<P.Main>
			{userId && uid && documents ? (
				documents.map(
					(users) =>
						users.uid === uid && (
							<P.Section key={users.uid}>
								<P.ContainerProfile>
									<P.ContainerImg>
										<img
											src={users.photoURL || persImg}
											alt={`${users.displayName}의 프로필 사진입니다.`}
										/>
									</P.ContainerImg>
									<P.H1>{users.displayName}</P.H1>
									<P.PP>{users.intro || ''}</P.PP>
									{userId === user?.displayName && (
										<P.ALink to='./edit' state={{ intro: users.intro }}>
											프로필 수정
										</P.ALink>
									)}
								</P.ContainerProfile>
								<UserLiked uid={users.uid} displayName={users.displayName} />
							</P.Section>
						)
				)
			) : (
				<ProfileSekeleton />
			)}
		</P.Main>
	);
}
