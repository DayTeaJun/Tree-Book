import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { P } from './Profile.style';
import persImg from '../../Assets/No-img.svg';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import { useEffect } from 'react';
import UserLiked from './UserLiked';
import { Loading } from '../../Components/LoadingSpinner/Loading';

export function Profile() {
	const { user } = useAuthContext();
	const { documents, error, isLoading } = useCollection('user');
	const anotherUser = useParams().userProfile || '';
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (user) {
			if (user.displayName === anotherUser) {
				navigate('/profile');
			}
		}
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<P.Main>
			{anotherUser &&
				anotherUser !== user?.displayName &&
				documents &&
				documents.map(
					(users) =>
						users.uid === location.state.id && (
							<P.Section key={users.uid}>
								<P.ContainerProfile>
									<h1>{users.displayName}의 프로필</h1>
									<P.Img
										src={users.photoURL || persImg}
										alt={`${users.displayName}의 프로필 사진입니다.`}
									/>
									<h2>{users.email}</h2>
								</P.ContainerProfile>
								<UserLiked uid={users.uid} displayName={users.displayName} />
							</P.Section>
						)
				)}

			{!anotherUser && user && (
				<P.Section key={user.uid}>
					<P.ContainerProfile>
						<h1>{user.displayName}의 프로필</h1>
						<P.Img
							src={user.photoURL || persImg}
							alt={`${user.displayName}의 프로필 사진입니다.`}
						/>
						<h2>{user.email}</h2>
						<P.ALink to='./edit'>프로필 수정하기</P.ALink>
					</P.ContainerProfile>
					<UserLiked uid={user.uid} displayName={user.displayName} />
				</P.Section>
			)}
		</P.Main>
	);
}
