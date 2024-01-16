import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { P } from './Profile.style';
import persImg from '../../Assets/No-img.svg';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import { useEffect } from 'react';

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

	if (documents) {
		console.log(documents);
	}

	return (
		<P.Main>
			{anotherUser &&
				anotherUser !== user?.displayName &&
				documents &&
				documents.map(
					(users) =>
						users.uid === location.state.id && (
							<>
								<P.Img
									src={users.photoURL || persImg}
									alt={`${users.displayName}의 프로필 사진입니다.`}
								/>
								<h1>{users.displayName}의 프로필</h1>
								<h2>{users.email}</h2>
							</>
						)
				)}

			{!anotherUser && user && (
				<>
					<P.Img
						src={user.photoURL || persImg}
						alt={`${user.displayName}의 프로필 사진입니다.`}
					/>
					<h1>{user.displayName}의 프로필</h1>
					<h2>{user.email}</h2>
					<P.ALink to='./edit'>프로필 수정하기</P.ALink>
				</>
			)}
		</P.Main>
	);
}
